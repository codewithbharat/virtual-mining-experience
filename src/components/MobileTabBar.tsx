
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, Wallet, UserRound } from 'lucide-react';

const MobileTabBar: React.FC = () => {
  const location = useLocation();
  
  const tabs = [
    { name: 'Mine', path: '/', icon: Home },
    { name: 'Referrals', path: '/referrals', icon: Users },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Profile', path: '/profile', icon: UserRound },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <Link 
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-lg",
                isActive 
                  ? "text-mining-default" 
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1",
                isActive ? "text-mining-default" : "text-gray-500 dark:text-gray-400"
              )} />
              <span className="text-xs font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabBar;
