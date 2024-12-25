import { FC } from "react";

interface DashboardHeaderProps {
  profile: any;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  profile,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome back, {profile?.email?.split('@')[0] || 'there'}!
      </h1>
    </div>
  );
};