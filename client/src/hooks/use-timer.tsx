import { useState, useRef, useEffect, useCallback } from 'react';

export type TimerPhase = 'focus' | 'break' | 'paused' | 'stopped';

export function useTimer(initialFocusTime = 25, initialBreakTime = 5) {
  const [focusTime, setFocusTime] = useState(initialFocusTime);
  const [breakTime, setBreakTime] = useState(initialBreakTime);
  const [timeLeft, setTimeLeft] = useState(initialFocusTime * 60);
  const [phase, setPhase] = useState<TimerPhase>('stopped');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    const totalTime = phase === 'focus' ? focusTime * 60 : breakTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        // Timer finished
        if (phase === 'focus') {
          setPhase('break');
          return breakTime * 60;
        } else {
          setPhase('focus');
          return focusTime * 60;
        }
      }
      return prev - 1;
    });
  }, [phase, focusTime, breakTime]);

  useEffect(() => {
    if (isRunning && phase !== 'paused' && phase !== 'stopped') {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, phase, tick]);

  const startTimer = () => {
    if (phase === 'stopped') {
      setPhase('focus');
      setTimeLeft(focusTime * 60);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (phase !== 'stopped') {
      setPhase('paused');
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setPhase('stopped');
    setTimeLeft(focusTime * 60);
  };

  const updateFocusTime = (minutes: number) => {
    setFocusTime(Math.max(1, Math.min(60, minutes)));
    if (phase === 'stopped' || phase === 'focus') {
      setTimeLeft(Math.max(1, Math.min(60, minutes)) * 60);
    }
  };

  const updateBreakTime = (minutes: number) => {
    setBreakTime(Math.max(1, Math.min(30, minutes)));
    if (phase === 'break') {
      setTimeLeft(Math.max(1, Math.min(30, minutes)) * 60);
    }
  };

  return {
    timeLeft,
    phase,
    isRunning,
    focusTime,
    breakTime,
    progress: getProgress(),
    formattedTime: formatTime(timeLeft),
    startTimer,
    pauseTimer,
    resetTimer,
    updateFocusTime,
    updateBreakTime,
  };
}
