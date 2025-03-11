
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  timeRemaining: string;
  canMine: boolean;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  timeRemaining, 
  canMine,
  className 
}) => {
  const [segmentValues, setSegmentValues] = useState<string[]>(['00', '00', '00']);
  
  useEffect(() => {
    if (timeRemaining) {
      setSegmentValues(timeRemaining.split(':'));
    }
  }, [timeRemaining]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {canMine ? 'Ready to mine!' : 'Next mining available in'}
      </div>
      
      {!canMine && (
        <div className="flex items-center justify-center space-x-2">
          <TimeSegment label="hours" value={segmentValues[0]} />
          <span className="text-mining-default text-xl font-medium">:</span>
          <TimeSegment label="mins" value={segmentValues[1]} />
          <span className="text-mining-default text-xl font-medium">:</span>
          <TimeSegment label="secs" value={segmentValues[2]} />
        </div>
      )}
      
      {canMine && (
        <div className="h-[76px] flex items-center justify-center">
          <div className="text-mining-default flex items-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-mining-light/60 animate-pulse-ring"></div>
              <div className="h-2 w-2 rounded-full bg-mining-default animate-pulse-dot"></div>
            </div>
            <span className="ml-2 font-medium">Ready to mine</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface TimeSegmentProps {
  label: string;
  value: string;
}

const TimeSegment: React.FC<TimeSegmentProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm px-3 py-2 w-16 text-center">
        <span className="text-xl font-mono font-semibold">{value}</span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</span>
    </div>
  );
};

export default CountdownTimer;
