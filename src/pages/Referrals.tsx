
import React, { useState } from 'react';
import { useMining } from '@/hooks/useMining';
import Header from '@/components/Header';
import ReferralCard, { ReferralItem, ReferralProps } from '@/components/ReferralCard';
import { toast } from '@/components/ui/use-toast';

// Mock referrals data
const MOCK_REFERRALS: ReferralProps[] = [
  {
    id: '1',
    name: 'John Smith',
    date: 'May 12, 2023',
    active: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    date: 'May 15, 2023',
    active: true,
  },
  {
    id: '3',
    name: 'Michael Brown',
    date: 'May 20, 2023',
    active: false,
  },
  {
    id: '4',
    name: 'Emily Davis',
    date: 'June 1, 2023',
    active: true,
  },
  {
    id: '5',
    name: 'Robert Wilson',
    date: 'June 5, 2023',
    active: false,
  },
];

const Referrals: React.FC = () => {
  const { miningRate } = useMining();
  const [isSharing, setIsSharing] = useState(false);
  
  // Mock referral code
  const referralCode = "VM-XYZ123";
  
  const handleShare = () => {
    setIsSharing(true);
    
    // Simulate share action
    setTimeout(() => {
      setIsSharing(false);
      toast({
        title: "Referral link shared",
        description: "Your referral link has been copied to clipboard!",
      });
    }, 1000);
  };
  
  return (
    <>
      <Header />
      
      <main className="pt-20 pb-24 min-h-screen gradient-bg">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-6 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Referrals</h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Invite friends to increase your mining rate by 25% per active referral.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Referral card */}
            <div className="lg:col-span-1 mb-6 lg:mb-0 animate-fade-in" 
              style={{ animationDelay: '0.1s' }}>
              <ReferralCard 
                referralCode={referralCode}
                onShare={handleShare}
                className="h-full"
              />
            </div>
            
            {/* Referral list */}
            <div className="lg:col-span-2 glass-card rounded-xl p-4 md:p-6 animate-fade-in" 
              style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-lg font-semibold">Your Referrals</h3>
                <div className="bg-mining-light/30 text-mining-default text-xs md:text-sm px-2 py-1 rounded-full">
                  Current boost: +{((miningRate - 1) * 100).toFixed(0)}%
                </div>
              </div>
              
              {MOCK_REFERRALS.length > 0 ? (
                <div className="space-y-3">
                  {MOCK_REFERRALS.map((referral, index) => (
                    <div 
                      key={referral.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${0.2 + (index * 0.05)}s` }}
                    >
                      <ReferralItem {...referral} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">
                    No referrals yet. Share your code to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Referrals;
