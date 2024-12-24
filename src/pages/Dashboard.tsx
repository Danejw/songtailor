import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OrdersList } from "@/components/dashboard/OrdersList";
import { LyricsReview } from "@/components/dashboard/LyricsReview";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { DownloadSection } from "@/components/dashboard/DownloadSection";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);

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
    }
  };

  const fetchDashboardData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch profile using maybeSingle() instead of single()
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } else {
        setProfile(profileData || { email: session.user.email });
      }

      // Fetch orders with nested songs and their cover images
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          songs!fk_song (
            title,
            style,
            themes,
            cover_images (
              file_path
            )
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
        setActiveOrders(ordersData.filter(order => order.status !== 'completed'));
        setCompletedOrders(ordersData.filter(order => order.status === 'completed'));
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
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
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader 
        profile={profile}
        activeOrdersCount={activeOrders.length}
        completedOrdersCount={completedOrders.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersList orders={activeOrders} type="active" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersList orders={completedOrders} type="completed" />
            </CardContent>
          </Card>

          <LyricsReview orders={activeOrders} />
          <DownloadSection orders={completedOrders} />
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
  );
}