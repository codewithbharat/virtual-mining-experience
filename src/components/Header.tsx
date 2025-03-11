
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, Wallet, UserRound, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Mine', path: '/', icon: Home },
    { name: 'Referrals', path: '/referrals', icon: Users },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Profile', path: '/profile', icon: UserRound },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 md:py-4">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="glass-card rounded-xl py-2 px-3 md:py-3 md:px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-mining-default font-bold text-xl mr-1">VM</div>
            <h1 className="text-sm md:text-lg font-semibold hidden sm:block">Virtual Mining</h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-1 sm:space-x-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg transition-all duration-300",
                        "hover:bg-black/5 dark:hover:bg-white/10",
                        isActive 
                          ? "bg-mining-default text-white font-medium" 
                          : "text-gray-600 dark:text-gray-300"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-1.5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
