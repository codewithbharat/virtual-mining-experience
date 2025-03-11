
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

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
        
        {/* Mining button - three-layer design with turquoise colors */}
        <button
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "relative flex flex-col items-center justify-center w-36 h-36 rounded-full transition-all duration-300 ease-out",
            "mining-button-shadow focus:outline-none",
            disabled 
              ? "bg-gray-800 cursor-not-allowed" 
              : "bg-[#1A2535] hover:scale-105",
            isPressed && "scale-95 transition-all duration-100",
            !disabled && "active:scale-95"
          )}
        >
          {/* Outer ring */}
          <div className="absolute inset-2 rounded-full border-2 border-mining-default opacity-70"></div>
          
          {/* Middle ring with gradient */}
          <div className="absolute inset-6 rounded-full bg-[#152535]"></div>
          
          {/* Inner circle with play icon */}
          <div className="absolute inset-12 rounded-full bg-mining-default flex items-center justify-center">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
          
          {/* Pulse animation */}
          {!disabled && (
            <div className="absolute inset-0 rounded-full animate-pulse">
              <div className="absolute inset-2 rounded-full border-2 border-mining-default opacity-30"></div>
            </div>
          )}
        </button>
      </div>
      
      {/* Text under button */}
      <div className="mt-6 text-center">
        <p className="text-gray-300 text-sm">
          Tap to mine FLY tokens daily
        </p>
      </div>
    </div>
  );
};

export default MiningButton;
