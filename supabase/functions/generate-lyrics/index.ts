import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  orderSongId: string;
  currentLyrics?: string;
  additionalPrompt?: string;
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
    const requestData = await req.json();
    const { orderSongId, currentLyrics, additionalPrompt } = requestData as RequestBody;
    console.log('Received request data:', { orderSongId, hasCurrentLyrics: !!currentLyrics, hasAdditionalPrompt: !!additionalPrompt });

    // Verify admin status
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!authHeader) {
      console.error('No authorization header provided');
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader);
    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('Unauthorized');
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Failed to verify admin status');
    }

    if (!profile?.is_admin) {
      console.error('User is not an admin:', user.id);
      throw new Error('Admin access required');
    }

    // First, get the order_song and its order_id
    console.log('Fetching order song data...');
    const { data: orderSong, error: orderSongError } = await supabaseClient
      .from('order_songs')
      .select('id, lyrics, order_id')
      .eq('id', orderSongId)
      .single();

    if (orderSongError) {
      console.error('Error fetching order song:', orderSongError);
      throw new Error(`Order song fetch error: ${orderSongError.message}`);
    }

    if (!orderSong) {
      console.error('Order song not found for ID:', orderSongId);
      throw new Error('Order song not found');
    }

    // Then, get the order and song details using the explicit foreign key relationship
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select(`
        metadata,
        songs!fk_song (
          style,
          themes,
          id
        )
      `)
      .eq('id', orderSong.order_id)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      throw new Error(`Order fetch error: ${orderError.message}`);
    }

    if (!order || !order.songs) {
      console.error('Order or song data not found');
      throw new Error('Order data not found');
    }

    console.log('Successfully fetched data:', {
      orderSongId: orderSong.id,
      style: order.songs.style,
      themes: order.songs.themes
    });

    // Verify OpenAI API key
    const openAIApiKey = Deno.env.get('OPEN_AI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    // Prepare context for OpenAI
    const metadata = order.metadata as Record<string, any> || {};
    const songStyle = order.songs.style || '';
    const themes = order.songs.themes || '';
    const existingLyrics = currentLyrics || orderSong.lyrics || '';

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

    // Add the additional prompt if provided
    if (additionalPrompt) {
      prompt += `\nAdditional Context from User: ${additionalPrompt}\n`;
    }

    prompt += `\nRequirements:
1. ALWAYS start with an [Instrumental] section to set the mood
2. Structure the lyrics with clear section markers: [Verse], [Chorus], [Bridge]
3. Ensure the lyrics flow naturally and match the specified style
4. Include at least one verse and one chorus
5. Make it emotionally resonant and memorable
6. ALWAYS end with an [Instrumental] section to close the song\n`;

    console.log('Sending request to OpenAI with prompt length:', prompt.length);

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional songwriter with expertise in various musical styles. Always structure songs to begin and end with instrumental sections to create a complete musical experience.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const openAIData = await openAIResponse.json();
    const generatedLyrics = openAIData.choices[0].message.content;

    console.log('Successfully generated lyrics');

    // Update both order_songs and songs tables
    const [orderSongUpdate, songUpdate] = await Promise.all([
      supabaseClient
        .from('order_songs')
        .update({ lyrics: generatedLyrics })
        .eq('id', orderSongId),
      
      supabaseClient
        .from('songs')
        .update({ lyrics: generatedLyrics })
        .eq('id', order.songs.id)
    ]);

    if (orderSongUpdate.error) {
      console.error('Error updating order_songs:', orderSongUpdate.error);
      throw orderSongUpdate.error;
    }
    if (songUpdate.error) {
      console.error('Error updating songs:', songUpdate.error);
      throw songUpdate.error;
    }

    console.log('Successfully updated database with new lyrics');

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