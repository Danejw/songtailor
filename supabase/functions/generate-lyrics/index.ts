import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  orderSongId: string;
  customPrompt?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get request data
    const { orderSongId, customPrompt } = await req.json() as RequestBody;

    // Verify admin status
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader);
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.is_admin) {
      throw new Error('Admin access required');
    }

    // Fetch order song data
    const { data: orderSong, error: orderSongError } = await supabaseClient
      .from('order_songs')
      .select(`
        *,
        orders!order_songs_order_id_fkey (
          metadata,
          songs!inner (
            style,
            themes
          )
        )
      `)
      .eq('id', orderSongId)
      .single();

    if (orderSongError || !orderSong) {
      throw new Error('Order song not found');
    }

    // Prepare context for OpenAI
    const metadata = orderSong.orders?.metadata as Record<string, any> || {};
    const songStyle = orderSong.orders?.songs?.style || '';
    const themes = orderSong.orders?.songs?.themes || '';
    const existingLyrics = orderSong.lyrics || '';

    // Construct the prompt for OpenAI
    let prompt = `You are a professional songwriter. Create engaging and creative lyrics `;
    if (existingLyrics) {
      prompt += `by improving these existing lyrics while maintaining their essence:\n\n${existingLyrics}\n\n`;
    } else {
      prompt += `for a new song with the following characteristics:\n`;
      prompt += `Style: ${songStyle}\n`;
      prompt += `Themes: ${themes}\n`;
      if (metadata.formData) {
        prompt += `Additional Context: ${JSON.stringify(metadata.formData)}\n`;
      }
    }

    prompt += `\nRequirements:
1. Structure the lyrics with clear section markers: [Intro], [Verse], [Chorus], [Bridge], [Instrumental], [Outro]
2. Ensure the lyrics flow naturally and match the specified style
3. Include at least one verse and one chorus
4. Make it emotionally resonant and memorable\n`;

    if (customPrompt) {
      prompt += `\nAdditional Instructions: ${customPrompt}`;
    }

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPEN_AI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a professional songwriter with expertise in various musical styles.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const openAIData = await openAIResponse.json();
    const generatedLyrics = openAIData.choices[0].message.content;

    // Update both order_songs and songs tables
    const [orderSongUpdate, songUpdate] = await Promise.all([
      supabaseClient
        .from('order_songs')
        .update({ lyrics: generatedLyrics })
        .eq('id', orderSongId),
      
      supabaseClient
        .from('songs')
        .update({ lyrics: generatedLyrics })
        .eq('id', orderSong.orders.songs.id)
    ]);

    if (orderSongUpdate.error) throw orderSongUpdate.error;
    if (songUpdate.error) throw songUpdate.error;

    // Return the generated lyrics
    return new Response(
      JSON.stringify({ lyrics: generatedLyrics }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-lyrics function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: error.message === 'Unauthorized' || error.message === 'Admin access required' ? 403 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});