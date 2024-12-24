import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Order } from "./types";

interface OrderRealTimeUpdatesProps {
  order: Order | null;
  onOrderUpdated: () => void;
}

export function OrderRealTimeUpdates({ order, onOrderUpdated }: OrderRealTimeUpdatesProps) {
  useEffect(() => {
    if (!order) return;

    // Subscribe to changes in the orders table
    const ordersChannel = supabase
      .channel('order-details')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders',
          filter: `id=eq.${order.id}`
        },
        () => {
          onOrderUpdated();
        }
      )
      .subscribe();

    // Subscribe to changes in the cover_images table
    const coverImagesChannel = supabase
      .channel('cover-images')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'cover_images',
          filter: `song_id=eq.${order.song_id}`
        },
        () => {
          onOrderUpdated();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(coverImagesChannel);
    };
  }, [order, onOrderUpdated]);

  return null;
}