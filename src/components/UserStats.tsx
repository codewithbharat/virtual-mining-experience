
import React from 'react';
import { cn } from '@/lib/utils';
import { Coins, Users, TrendingUp } from 'lucide-react';

interface UserStatsProps {
  coins: number;
  miningRate: number;
  activeReferrals: number;
  totalReferrals: number;
  className?: string;
}

const UserStats: React.FC<UserStatsProps> = ({ 
  coins, 
  miningRate, 
  activeReferrals, 
  totalReferrals,
  className 
}) => {
  const stats = [
    {
      name: 'Total Coins',
      value: coins.toFixed(2),
      icon: Coins,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      name: 'Mining Rate',
      value: `${miningRate.toFixed(2)}/mine`,
      icon: TrendingUp,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      name: 'Referrals',
      value: `${activeReferrals}/${totalReferrals}`,
      icon: Users,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];
  
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {stats.map((stat) => (
        <StatCard key={stat.name} {...stat} />
      ))}
    </div>
  );
};

interface StatCardProps {
  name: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  iconColor: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ name, value, icon: Icon, iconColor, bgColor }) => {
  return (
    <div className="glass-card rounded-xl p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center">
        <div className={cn("p-2 rounded-lg mr-4", bgColor)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{name}</div>
          <div className="text-lg font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
