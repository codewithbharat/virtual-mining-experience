
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface MiningButtonProps {
  onClick: () => void;
  disabled?: boolean;
  miningRate: number;
}

const MiningButton: React.FC<MiningButtonProps> = ({
  onClick,
  disabled = false,
  miningRate
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = () => {
    if (disabled) return;
    
    setIsPressed(true);
    onClick();
    
    // Reset the pressed state after animation
    setTimeout(() => {
      setIsPressed(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Outer ring animation when button is active */}
        {!disabled && (
          <div className="absolute inset-0 rounded-full animate-pulse-ring opacity-50 bg-mining-light" />
        )}
        
        {/* Mining button */}
        <button
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "relative flex flex-col items-center justify-center w-48 h-48 rounded-full transition-all duration-300 ease-out",
            "mining-button-shadow focus:outline-none",
            disabled 
              ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" 
              : "bg-white dark:bg-gray-900 hover:scale-105",
            isPressed && "scale-95 transition-all duration-100",
            !disabled && "active:scale-95"
          )}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-opacity duration-300",
                disabled 
                  ? "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 opacity-50" 
                  : "from-mining-light to-mining-default opacity-10"
              )}
            />
          </div>
          
          <div className="flex flex-col items-center justify-center h-full">
            <div className={cn(
              "text-lg font-medium mb-1",
              disabled 
                ? "text-gray-400 dark:text-gray-500" 
                : "text-mining-default"
            )}>
              Mine Now
            </div>
            <div className={cn(
              "text-sm",
              disabled 
                ? "text-gray-400 dark:text-gray-500" 
                : "text-gray-500 dark:text-gray-400"
            )}>
              {miningRate.toFixed(2)} coins/mine
            </div>
          </div>
          
          {/* Inner circle pulse animation */}
          {!disabled && (
            <div className="absolute inset-10 rounded-full bg-mining-default/5 animate-pulse"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default MiningButton;
