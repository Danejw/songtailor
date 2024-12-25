import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OrdersList } from "@/components/dashboard/OrdersList";
import { LyricsReview } from "@/components/dashboard/LyricsReview";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { PurchasedContent } from "@/components/dashboard/PurchasedContent";
import { ChevronDown } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [isActiveOrdersOpen, setIsActiveOrdersOpen] = useState(true);
  const [isCompletedOrdersOpen, setIsCompletedOrdersOpen] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to view your dashboard",
      });
      navigate("/login", { state: { returnTo: "/dashboard" } });
      return;
    }
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      } else {
        setProfile({ email: session.user.email });
      }

      // Fetch orders with nested songs, removing cover_images for now
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          songs!orders_song_id_fkey (
            title,
            style,
            themes
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        toast({
          title: "Error",
          description: "Failed to load orders data",
          variant: "destructive",
        });
      } else if (ordersData) {
        const active = ordersData.filter(order => order.status !== 'completed');
        const completed = ordersData.filter(order => order.status === 'completed');
        setActiveOrders(active);
        setCompletedOrders(completed);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-b from-white to-purple-50/30 grid-pattern-dark -z-10" />
      <div className="absolute inset-0 bg-white/50" />
      <div className="container mx-auto px-4 py-8 relative">
        <DashboardHeader 
          profile={profile}
          activeOrdersCount={activeOrders.length}
          completedOrdersCount={completedOrders.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <PurchasedContent />
            
            <Collapsible
              open={isActiveOrdersOpen}
              onOpenChange={setIsActiveOrdersOpen}
              className="w-full"
            >
              <Card>
                <CardHeader className="cursor-pointer">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <CardTitle>Active Orders</CardTitle>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isActiveOrdersOpen ? 'transform rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <OrdersList orders={activeOrders} type="active" />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Collapsible
              open={isCompletedOrdersOpen}
              onOpenChange={setIsCompletedOrdersOpen}
              className="w-full"
            >
              <Card>
                <CardHeader className="cursor-pointer">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <CardTitle>Completed Orders</CardTitle>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isCompletedOrdersOpen ? 'transform rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <OrdersList orders={completedOrders} type="completed" />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <LyricsReview orders={activeOrders} />
          </div>

          <div className="space-y-6">
            <NotificationsPanel userId={profile?.id} />
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/order')}
                >
                  Order New Song
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/account')}
                >
                  Update Account Info
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
