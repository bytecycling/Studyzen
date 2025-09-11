import { Play, Pause, RotateCcw, Settings, Minus, Plus } from 'lucide-react';
import { useTimer } from '@/hooks/use-timer';

export default function PomodoroTimer() {
  const {
    timeLeft,
    phase,
    isRunning,
    focusTime,
    breakTime,
    progress,
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    updateFocusTime,
    updateBreakTime,
  } = useTimer();

  const getPhaseDisplay = () => {
    switch (phase) {
      case 'focus':
        return 'Focus Time';
      case 'break':
        return 'Break Time';
      case 'paused':
        return 'Paused';
      default:
        return 'Ready to Start';
    }
  };

  const progressAngle = (progress / 100) * 360;

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Pomodoro Timer</h3>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" data-testid="button-settings">
          <Settings className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-calm-blue-100 to-nature-green-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-2 rounded-full bg-white shadow-inner"></div>
            
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgb(59 130 246 / 0.2)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            
            <div className="relative z-10 text-center">
              <div className="text-4xl font-bold text-gray-900" data-testid="text-timer-display">
                {formattedTime}
              </div>
              <div className="text-sm text-gray-600" data-testid="text-timer-phase">
                {getPhaseDisplay()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={startTimer}
            className="px-6 py-3 bg-nature-green-500 hover:bg-nature-green-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            data-testid="button-start"
          >
            <Play className="w-5 h-5 inline mr-2" />
            Start
          </button>
          <button
            onClick={pauseTimer}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-300"
            data-testid="button-pause"
          >
            <Pause className="w-5 h-5 inline mr-2" />
            Pause
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium transition-all duration-300"
            data-testid="button-reset"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            Reset
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Focus Time</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateFocusTime(focusTime - 1)}
                className="w-8 h-8 bg-white rounded-lg text-gray-600 hover:text-gray-800 flex items-center justify-center"
                data-testid="button-decrease-focus"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium" data-testid="text-focus-time">
                {focusTime}
              </span>
              <button
                onClick={() => updateFocusTime(focusTime + 1)}
                className="w-8 h-8 bg-white rounded-lg text-gray-600 hover:text-gray-800 flex items-center justify-center"
                data-testid="button-increase-focus"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Break Time</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateBreakTime(breakTime - 1)}
                className="w-8 h-8 bg-white rounded-lg text-gray-600 hover:text-gray-800 flex items-center justify-center"
                data-testid="button-decrease-break"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium" data-testid="text-break-time">
                {breakTime}
              </span>
              <button
                onClick={() => updateBreakTime(breakTime + 1)}
                className="w-8 h-8 bg-white rounded-lg text-gray-600 hover:text-gray-800 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
