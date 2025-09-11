import { useState, useRef, useEffect } from 'react';
import { AudioGenerator } from '@/lib/audio-generator';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [noiseType, setNoiseType] = useState<'brown' | 'white'>('brown');
  const audioGeneratorRef = useRef<AudioGenerator | null>(null);

  useEffect(() => {
    audioGeneratorRef.current = new AudioGenerator();
    
    return () => {
      audioGeneratorRef.current?.cleanup();
    };
  }, []);

  useEffect(() => {
    if (audioGeneratorRef.current) {
      audioGeneratorRef.current.setVolume(volume);
    }
  }, [volume]);

  const togglePlayPause = async () => {
    if (!audioGeneratorRef.current) return;

    if (isPlaying) {
      audioGeneratorRef.current.stopNoise();
      setIsPlaying(false);
    } else {
      await audioGeneratorRef.current.startNoise(noiseType);
      setIsPlaying(true);
    }
  };

  const changeNoiseType = async (type: 'brown' | 'white') => {
    setNoiseType(type);
    
    if (isPlaying && audioGeneratorRef.current) {
      audioGeneratorRef.current.stopNoise();
      await audioGeneratorRef.current.startNoise(type);
    }
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
  };

  return {
    isPlaying,
    volume,
    noiseType,
    togglePlayPause,
    changeNoiseType,
    updateVolume,
  };
}
