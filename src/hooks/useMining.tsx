
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface MiningState {
  coins: number;
  miningRate: number;
  lastMined: Date | null;
  canMine: boolean;
  timeUntilNextMine: number; // in seconds
  activeReferrals: number;
  totalReferrals: number;
}

// Mock data - in a real app, this would come from an API
const MOCK_USER = {
  username: 'user1',
  coins: 100,
  lastMined: new Date(Date.now() - 1000 * 60 * 60 * 14), // 14 hours ago
  activeReferrals: 2,
  totalReferrals: 5,
  referralCode: 'USER1-ABC123',
};

// Constants
const MINING_INTERVAL = 12 * 60 * 60; // 12 hours in seconds
const BASE_RATE = 1.0; // Base mining rate
const REFERRAL_BONUS = 0.25; // 25% bonus per active referral

export function useMining() {
  const [state, setState] = useState<MiningState>({
    coins: MOCK_USER.coins,
    miningRate: BASE_RATE * (1 + REFERRAL_BONUS * MOCK_USER.activeReferrals),
    lastMined: MOCK_USER.lastMined,
    canMine: false,
    timeUntilNextMine: 0,
    activeReferrals: MOCK_USER.activeReferrals,
    totalReferrals: MOCK_USER.totalReferrals,
  });

  // Calculate if mining is possible and time until next mine
  const updateMiningStatus = useCallback(() => {
    if (!state.lastMined) {
      setState(prev => ({ ...prev, canMine: true, timeUntilNextMine: 0 }));
      return;
    }

    const now = new Date();
    const lastMined = new Date(state.lastMined);
    const diffSeconds = Math.floor((now.getTime() - lastMined.getTime()) / 1000);
    const canMine = diffSeconds >= MINING_INTERVAL;
    const timeUntilNextMine = canMine ? 0 : MINING_INTERVAL - diffSeconds;

    setState(prev => ({ ...prev, canMine, timeUntilNextMine }));
  }, [state.lastMined]);

  // Update status on initial load and when lastMined changes
  useEffect(() => {
    updateMiningStatus();
    const interval = setInterval(updateMiningStatus, 1000);
    return () => clearInterval(interval);
  }, [updateMiningStatus]);

  // Mining function
  const mine = useCallback(() => {
    if (!state.canMine) {
      toast({
        title: "Mining not available yet",
        description: "Please wait until your next mining session becomes available",
        variant: "destructive",
      });
      return;
    }

    // Calculate coins earned based on rate
    const coinsEarned = state.miningRate;
    
    // Update state
    setState(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      lastMined: new Date(),
      canMine: false,
      timeUntilNextMine: MINING_INTERVAL,
    }));

    // Show success toast
    toast({
      title: "Mining Successful!",
      description: `You earned ${coinsEarned.toFixed(2)} coins`,
    });

    // In a real app, you would call an API here
    console.log("Mined", coinsEarned, "coins");
  }, [state.canMine, state.miningRate]);

  // Format time for display
  const formatTimeRemaining = useCallback(() => {
    const hours = Math.floor(state.timeUntilNextMine / 3600);
    const minutes = Math.floor((state.timeUntilNextMine % 3600) / 60);
    const seconds = Math.floor(state.timeUntilNextMine % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [state.timeUntilNextMine]);

  // Add a referral (simulated)
  const addReferral = useCallback((active: boolean = false) => {
    setState(prev => ({
      ...prev,
      totalReferrals: prev.totalReferrals + 1,
      activeReferrals: active ? prev.activeReferrals + 1 : prev.activeReferrals,
      miningRate: active 
        ? BASE_RATE * (1 + REFERRAL_BONUS * (prev.activeReferrals + 1))
        : prev.miningRate
    }));
    
    toast({
      title: "New Referral Added!",
      description: active ? "Your new referral is already active!" : "Once they start mining, your rate will increase.",
    });
  }, []);

  // Activate a referral (simulated)
  const activateReferral = useCallback(() => {
    if (state.activeReferrals >= state.totalReferrals) return;
    
    setState(prev => ({
      ...prev,
      activeReferrals: prev.activeReferrals + 1,
      miningRate: BASE_RATE * (1 + REFERRAL_BONUS * (prev.activeReferrals + 1))
    }));
    
    toast({
      title: "Referral Activated!",
      description: "Your mining rate has increased!",
    });
  }, [state.activeReferrals, state.totalReferrals]);

  return {
    ...state,
    mine,
    formatTimeRemaining,
    addReferral,
    activateReferral,
    referralCode: MOCK_USER.referralCode,
  };
}
