
import React from 'react';
import { useMining } from '@/hooks/useMining';
import Header from '@/components/Header';

const Wallet: React.FC = () => {
  const { coins } = useMining();
  
  return (
    <>
      <Header />
      
      <main className="pt-20 pb-24 min-h-screen gradient-bg">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-6 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Wallet</h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Manage your virtual mining coins and transactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <div className="glass-card rounded-xl p-6 animate-fade-in">
              <div className="flex flex-col items-center justify-center p-4">
                <div className="text-4xl md:text-6xl font-bold text-mining-default mb-2">
                  {coins.toFixed(2)}
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Total Coins
                </div>
              </div>
              
              <div className="mt-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                    <div>
                      <div className="font-medium">Mining Reward</div>
                      <div className="text-sm text-gray-500">Today, 10:30 AM</div>
                    </div>
                    <div className="text-mining-default font-medium">+1.25</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                    <div>
                      <div className="font-medium">Referral Bonus</div>
                      <div className="text-sm text-gray-500">Yesterday, 5:45 PM</div>
                    </div>
                    <div className="text-mining-default font-medium">+0.25</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                    <div>
                      <div className="font-medium">Mining Reward</div>
                      <div className="text-sm text-gray-500">Yesterday, 9:15 AM</div>
                    </div>
                    <div className="text-mining-default font-medium">+1.25</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Wallet;
