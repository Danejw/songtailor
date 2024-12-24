import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardHeaderProps {
  profile: any;
  activeOrdersCount: number;
  completedOrdersCount: number;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  profile,
  activeOrdersCount,
  completedOrdersCount,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome back, {profile?.email?.split('@')[0] || 'there'}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activeOrdersCount}</div>
            <p className="text-muted-foreground">Active Orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{completedOrdersCount}</div>
            <p className="text-muted-foreground">Completed Orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activeOrdersCount + completedOrdersCount}</div>
            <p className="text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};