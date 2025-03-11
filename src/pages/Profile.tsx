
import React from 'react';
import { useMining } from '@/hooks/useMining';
import Header from '@/components/Header';
import { UserRound, Settings, HelpCircle, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { coins, activeReferrals } = useMining();
  
  return (
    <>
      <Header />
      
      <main className="pt-20 pb-24 min-h-screen gradient-bg">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <div className="glass-card rounded-xl p-6 animate-fade-in">
              <div className="flex flex-col items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-mining-default/20 flex items-center justify-center mb-4">
                  <UserRound className="h-12 w-12 text-mining-default" />
                </div>
                <h3 className="text-xl font-bold text-white">Virtual Miner</h3>
                <p className="text-sm text-gray-400">Member since June 2023</p>
                
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <div className="p-4 bg-gray-800/40 rounded-xl text-center">
                    <div className="text-lg font-semibold text-white">{coins.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">Coins</div>
                  </div>
                  <div className="p-4 bg-gray-800/40 rounded-xl text-center">
                    <div className="text-lg font-semibold text-white">{activeReferrals}</div>
                    <div className="text-sm text-gray-400">Active Referrals</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-2">
                <button className="flex items-center w-full p-4 rounded-xl bg-gray-800/40 hover:bg-gray-700/60 transition-colors">
                  <Settings className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="text-white">Settings</span>
                </button>
                
                <button className="flex items-center w-full p-4 rounded-xl bg-gray-800/40 hover:bg-gray-700/60 transition-colors">
                  <HelpCircle className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="text-white">Help & Support</span>
                </button>
                
                <button className="flex items-center w-full p-4 rounded-xl bg-gray-800/40 hover:bg-gray-700/60 transition-colors">
                  <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="text-white">Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
