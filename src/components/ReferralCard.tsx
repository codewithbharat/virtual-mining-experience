
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReferralCardProps {
  referralCode: string;
  onShare?: () => void;
  className?: string;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ 
  referralCode, 
  onShare,
  className 
}) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your referral code has been copied!",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={cn("glass-card rounded-xl p-4 md:p-6", className)}>
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Your Referral Code</h3>
      
      <div className="mb-4 md:mb-6">
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2">
          Share this code with friends to boost your mining rate by 25% for each active referral.
        </p>
        
        <div className="flex items-center">
          <div className="bg-white dark:bg-gray-800 flex-1 rounded-l-lg border border-gray-200 dark:border-gray-700 p-2 md:p-3">
            <code className="font-mono text-base md:text-lg font-semibold text-mining-default">
              {referralCode}
            </code>
          </div>
          <button 
            onClick={copyToClipboard}
            className={cn(
              "rounded-r-lg p-2 md:p-3 h-full transition-all flex items-center justify-center",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              copied 
                ? "bg-green-500 text-white" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-y border-r border-gray-200 dark:border-gray-700"
            )}
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Copy className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        </div>
      </div>
      
      <button 
        onClick={onShare}
        className="w-full bg-mining-default hover:bg-mining-dark text-white rounded-lg py-2 md:py-3 transition-all duration-300 text-sm md:text-base font-medium"
      >
        Share with Friends
      </button>
    </div>
  );
};

export interface ReferralProps {
  id: string;
  name: string;
  date: string;
  active: boolean;
}

export const ReferralItem: React.FC<ReferralProps> = ({ 
  name, 
  date, 
  active 
}) => {
  return (
    <div className="glass-card rounded-lg p-3 md:p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className={cn(
          "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-2 md:mr-3",
          active 
            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        )}>
          {active ? (
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <XCircle className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </div>
        <div>
          <div className="text-sm md:text-base font-medium">{name}</div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Joined: {date}</div>
        </div>
      </div>
      <div className={cn(
        "text-xs md:text-sm px-2 py-1 rounded-full",
        active 
          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
      )}>
        {active ? "Active" : "Inactive"}
      </div>
    </div>
  );
};

export default ReferralCard;
