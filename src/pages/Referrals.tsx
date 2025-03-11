
import React, { useState } from 'react';
import { useMining } from '@/hooks/useMining';
import Header from '@/components/Header';
import ReferralCard, { ReferralItem, ReferralProps } from '@/components/ReferralCard';
import { toast } from '@/hooks/use-toast';

// Mock referral data
const MOCK_REFERRALS: ReferralProps[] = [
  {
    id: '1',
    name: 'John Davis',
    date: 'May 15, 2023',
    active: true,
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    date: 'June 3, 2023',
    active: true,
  },
  {
    id: '3',
    name: 'Michael Brown',
    date: 'July 10, 2023',
    active: false,
  },
  {
    id: '4',
    name: 'Emma Smith',
    date: 'August 22, 2023',
    active: false,
  },
  {
    id: '5',
    name: 'Robert Johnson',
    date: 'September 5, 2023',
    active: false,
  },
];

const Referrals: React.FC = () => {
  const { referralCode, activeReferrals, totalReferrals, addReferral, activateReferral } = useMining();
  const [referrals] = useState<ReferralProps[]>(MOCK_REFERRALS);
  
  // Handle sharing referral code
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Virtual Mining!',
        text: `Use my referral code ${referralCode} to start mining virtual coins!`,
        url: window.location.origin,
      });
    } else {
      toast({
        title: "Sharing not supported",
        description: "Please copy the code and share it manually.",
      });
    }
  };
  
  // Debug: Simulate adding a new referral
  const handleAddReferral = () => {
    addReferral(false);
    toast({
      title: "Demo Mode",
      description: "In a real app, this would happen when someone uses your code.",
    });
  };
  
  // Debug: Simulate activating a referral
  const handleActivateReferral = () => {
    activateReferral();
    toast({
      title: "Demo Mode",
      description: "In a real app, this would happen when your referral mines.",
    });
  };
  
  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16 min-h-screen gradient-bg">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Your Referrals</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Invite friends to increase your mining rate by 25% per active referral.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: Stats and referral code */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold mb-4">Referral Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Active Referrals</span>
                    <span className="font-semibold">{activeReferrals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Total Referrals</span>
                    <span className="font-semibold">{totalReferrals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Mining Boost</span>
                    <span className="font-semibold text-green-500">+{(activeReferrals * 25)}%</span>
                  </div>
                </div>
              </div>
              
              <ReferralCard 
                referralCode={referralCode} 
                onShare={handleShare}
                className="animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              />
              
              {/* Debug buttons */}
              <div className="flex space-x-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <button 
                  onClick={handleAddReferral}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg py-2 transition-all text-sm"
                >
                  Add Referral (Demo)
                </button>
                <button 
                  onClick={handleActivateReferral}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg py-2 transition-all text-sm"
                >
                  Activate Referral (Demo)
                </button>
              </div>
            </div>
            
            {/* Right column: Referral list */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold mb-4">Your Referrals</h3>
                
                <div className="space-y-3">
                  {referrals.length > 0 ? (
                    referrals.map((referral, index) => (
                      <div 
                        key={referral.id} 
                        className="animate-fade-in" 
                        style={{ animationDelay: `${0.2 + (index * 0.05)}s` }}
                      >
                        <ReferralItem {...referral} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                      No referrals yet. Share your code to get started!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Referrals;
