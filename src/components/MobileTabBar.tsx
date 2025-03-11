
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, Wallet, UserRound } from 'lucide-react';

const MobileTabBar: React.FC = () => {
  const location = useLocation();
  
  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Circle', path: '/referrals', icon: Users },
    { name: 'Profile', path: '/profile', icon: UserRound },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1F2C] border-t border-gray-800">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <Link 
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2",
                isActive 
                  ? "text-mining-default" 
                  : "text-gray-500"
              )}
            >
              <div className={cn(
                "relative flex items-center justify-center",
                isActive && "mb-1"
              )}>
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-full w-1.5 h-1.5 rounded-full bg-mining-default" />
                )}
                <Icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-mining-default" : "text-gray-500"
                )} />
              </div>
              <span className="text-xs font-medium mt-1">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabBar;
