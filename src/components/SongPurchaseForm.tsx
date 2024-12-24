import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PriceSummary } from "./PriceSummary";
import { PersonalInfo } from "./song-purchase/PersonalInfo";
import { SongDetails } from "./song-purchase/SongDetails";
import { AddOns } from "./song-purchase/AddOns";
import { formSchema, FormValues } from "./song-purchase/types";

export function SongPurchaseForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [basePrice] = useState(29.99);
  const [isLoading, setIsLoading] = useState(true);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showOtherMusicStyle, setShowOtherMusicStyle] = useState(false);
  const [showOtherMood, setShowOtherMood] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wantCoverImage: false,
      wantSecondSong: false,
      wantSecondCoverImage: false,
    },
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a purchase",
      });
      navigate("/login", { state: { returnTo: "/order" } });
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to make a purchase",
        });
        navigate("/login", { state: { returnTo: "/order" } });
        return;
      }

      // Create a new song entry
      const { data: songData, error: songError } = await supabase
        .from('songs')
        .insert([
          {
            user_id: session.user.id,
            title: data.songTitle || 'Untitled Song',
            style: data.musicStyle === 'Other' ? data.otherMusicStyle : data.musicStyle,
            lyrics: data.lyrics,
            themes: data.theme || '',
            reference_links: data.references,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (songError) throw songError;

      // Calculate total amount
      const totalAmount = basePrice + 
        (data.wantCoverImage ? 5 : 0) + 
        (data.wantSecondSong ? 15 : 0) + 
        (data.wantSecondCoverImage ? 5 : 0);

      // Create an order with 'paid' status
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            song_id: songData.id,
            user_id: session.user.id,
            amount: totalAmount,
            includes_both_versions: data.wantSecondSong,
            includes_cover_image: data.wantCoverImage || data.wantSecondCoverImage,
            status: 'paid',
            payment_status: 'succeeded',
            metadata: {
              formData: data
            }
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create primary order song entry
      const { error: primarySongError } = await supabase
        .from('order_songs')
        .insert([
          {
            order_id: orderData.id,
            is_primary: true
          }
        ]);

      if (primarySongError) throw primarySongError;

      // If second song is requested, create another order song entry
      if (data.wantSecondSong) {
        const { error: secondarySongError } = await supabase
          .from('order_songs')
          .insert([
            {
              order_id: orderData.id,
              is_primary: false
            }
          ]);

        if (secondarySongError) throw secondarySongError;
      }

      toast({
        title: "Order placed successfully!",
        description: "Your song request has been received.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Custom Song Request</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <PersonalInfo form={form} />
          
          <SongDetails
            form={form}
            showLyrics={showLyrics}
            setShowLyrics={setShowLyrics}
            showOtherMusicStyle={showOtherMusicStyle}
            setShowOtherMusicStyle={setShowOtherMusicStyle}
            showOtherMood={showOtherMood}
            setShowOtherMood={setShowOtherMood}
          />

          <AddOns form={form} />

          <PriceSummary 
            basePrice={basePrice}
            values={form.watch()}
          />

          <Button type="submit" className="w-full">
            Submit and Continue to Payment
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SongPurchaseForm;