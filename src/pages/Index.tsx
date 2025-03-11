
import React, { useEffect, useState } from 'react';
import { useMining } from '@/hooks/useMining';
import MiningButton from '@/components/MiningButton';
import CountdownTimer from '@/components/CountdownTimer';
import UserStats from '@/components/UserStats';
import Header from '@/components/Header';
import { toast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const { 
    coins, 
    miningRate, 
    canMine, 
    formatTimeRemaining, 
    mine, 
    activeReferrals, 
    totalReferrals 
  } = useMining();
  
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Mining handler with animation
  const handleMining = () => {
    if (!canMine) {
      toast({
        title: "Mining not available yet",
        description: "Please wait until your next mining session becomes available",
        variant: "destructive",
      });
      return;
    }
    
    setShowAnimation(true);
    mine();
    
    // Reset animation state after it completes
    setTimeout(() => setShowAnimation(false), 3000);
  };
  
  // Initial animation on mount
  useEffect(() => {
    document.body.classList.add('gradient-bg');
    return () => {
      document.body.classList.remove('gradient-bg');
    };
  }, []);
  
  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16 min-h-screen flex flex-col">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Coin animation overlay */}
          {showAnimation && (
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
              <div className="relative">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute animate-float"
                    style={{
                      top: Math.random() * 200 - 100,
                      left: Math.random() * 200 - 100,
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: `${1 + Math.random() * 2}s`,
                      opacity: 0.7,
                    }}
                  >
                    <div className="text-5xl">💰</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* User stats */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <UserStats 
              coins={coins}
              miningRate={miningRate}
              activeReferrals={activeReferrals}
              totalReferrals={totalReferrals}
            />
          </div>
          
          {/* Mining section */}
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold mb-2">Virtual Mining</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Press the button every 12 hours to mine coins. Refer friends to increase your mining rate.
              </p>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <MiningButton 
                onClick={handleMining} 
                disabled={!canMine}
                miningRate={miningRate}
              />
            </div>
            
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CountdownTimer 
                timeRemaining={formatTimeRemaining()} 
                canMine={canMine} 
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
