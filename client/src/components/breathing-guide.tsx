import { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';

export default function BreathingGuide() {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState<1 | 5>(1);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(duration * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const phases = {
    inhale: { duration: 4, label: 'Breathe In', next: 'hold' as const },
    hold: { duration: 2, label: 'Hold', next: 'exhale' as const },
    exhale: { duration: 6, label: 'Breathe Out', next: 'rest' as const },
    rest: { duration: 2, label: 'Rest', next: 'inhale' as const },
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTotalSecondsLeft((prev) => {
          if (prev <= 1) {
            stopBreathing();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      phaseIntervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setCurrentPhase((currentPhase) => phases[currentPhase].next);
            return phases[phases[currentPhase].next].duration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
    };
  }, [isActive]);

  const startBreathing = () => {
    setIsActive(true);
    setTotalSecondsLeft(duration * 60);
    setCurrentPhase('inhale');
    setSecondsLeft(4);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setSecondsLeft(4);
    setTotalSecondsLeft(duration * 60);
  };

  const getAnimationScale = () => {
    if (!isActive) return 'scale(1)';
    
    switch (currentPhase) {
      case 'inhale':
        return 'scale(1.4)';
      case 'hold':
        return 'scale(1.4)';
      case 'exhale':
        return 'scale(0.8)';
      case 'rest':
        return 'scale(0.8)';
      default:
        return 'scale(1)';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Breathing Guide</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setDuration(1)}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              duration === 1
                ? 'bg-calm-blue-100 text-calm-blue-800 hover:bg-calm-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            data-testid="button-1min"
          >
            1 min
          </button>
          <button
            onClick={() => setDuration(5)}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              duration === 5
                ? 'bg-calm-blue-100 text-calm-blue-800 hover:bg-calm-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            data-testid="button-5min"
          >
            5 min
          </button>
        </div>
      </div>
      
      <div className="text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <div 
            className="w-40 h-40 rounded-full bg-gradient-to-br from-nature-green-200 to-calm-blue-200 flex items-center justify-center transition-transform duration-[2000ms] ease-in-out"
            style={{ transform: getAnimationScale() }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-nature-green-400 to-calm-blue-400 opacity-80"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-gray-800" data-testid="text-breathing-instruction">
            {phases[currentPhase].label}
          </div>
          <div className="text-sm text-gray-600" data-testid="text-breathing-count">
            {secondsLeft} seconds
          </div>
          {isActive && (
            <div className="text-xs text-gray-500" data-testid="text-time-remaining">
              Time remaining: {Math.floor(totalSecondsLeft / 60)}:{(totalSecondsLeft % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={startBreathing}
            disabled={isActive}
            className="px-6 py-3 bg-nature-green-500 hover:bg-nature-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            data-testid="button-start-breathing"
          >
            <Play className="w-5 h-5 inline mr-2" />
            Start
          </button>
          <button
            onClick={stopBreathing}
            disabled={!isActive}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl font-medium transition-all duration-300"
            data-testid="button-stop-breathing"
          >
            <Square className="w-5 h-5 inline mr-2" />
            Stop
          </button>
        </div>
        
        <div className="bg-nature-green-50 rounded-xl p-4 text-sm text-nature-green-800">
          <p>
            <strong>Benefits:</strong> Lowers stress, reduces anxiety, and improves cognitive flexibility through mindful breathing.
          </p>
        </div>
      </div>
    </div>
  );
}
