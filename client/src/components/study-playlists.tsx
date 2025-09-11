
import { Play, Pause, RefreshCw, Volume2, SkipForward, SkipBack } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Playlist {
  id: string;
  name: string;
  description: string;
  duration: string;
  tracks: number;
  imageUrl: string;
  type: 'lofi';
  audioUrl: string;
}

export default function StudyPlaylists() {
  const [playlists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Chill Lofi Beats',
      description: 'Relaxing beats for deep focus',
      duration: '2h 30m',
      tracks: 45,
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
      type: 'lofi',
      audioUrl: 'https://audio.chosic.com/wp-content/uploads/2022/05/lofi-study-112191.mp3',
    },
    {
      id: '2',
      name: 'Study Lofi',
      description: 'Perfect background music for studying',
      duration: '1h 45m',
      tracks: 28,
      imageUrl: 'https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
      type: 'lofi',
      audioUrl: 'https://audio.chosic.com/wp-content/uploads/2022/08/lofi-ambient-128735.mp3',
    },
    {
      id: '3',
      name: 'Night Lofi',
      description: 'Peaceful late night study vibes',
      duration: '3h 15m',
      tracks: 52,
      imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
      type: 'lofi',
      audioUrl: 'https://audio.chosic.com/wp-content/uploads/2022/05/lofi-chill-medium-version-159456.mp3',
    },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [volume, setVolume] = useState(60);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Apply volume changes
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const startProgressTracking = () => {
    intervalRef.current = setInterval(updateProgress, 1000);
  };

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePlayPlaylist = async (playlistId: string) => {
    try {
      if (isPlaying && currentPlaylist === playlistId) {
        // Stop current playlist
        if (audioRef.current) {
          audioRef.current.pause();
          stopProgressTracking();
        }
        setIsPlaying(false);
        setCurrentPlaylist(null);
        return;
      }

      // Stop any currently playing playlist
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        stopProgressTracking();
      }

      const playlist = playlists.find(p => p.id === playlistId);
      if (!playlist) {
        console.error('Playlist not found:', playlistId);
        return;
      }

      // Create new audio element
      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(playlist.audioUrl);
      audioRef.current.volume = volume / 100;
      audioRef.current.loop = true;
      audioRef.current.crossOrigin = 'anonymous';

      // Set up event listeners
      audioRef.current.addEventListener('loadedmetadata', () => {
        updateProgress();
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentPlaylist(null);
        stopProgressTracking();
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
        setCurrentPlaylist(null);
        stopProgressTracking();
      });

      // Add loading state feedback
      audioRef.current.addEventListener('loadstart', () => {
        console.log('Loading started for:', playlist.name);
      });

      audioRef.current.addEventListener('canplay', () => {
        console.log('Audio can start playing:', playlist.name);
      });

      await audioRef.current.play();
      setIsPlaying(true);
      setCurrentPlaylist(playlistId);
      startProgressTracking();

      console.log('Playlist started successfully:', playlist.name);
    } catch (error) {
      console.error('Error starting playlist:', error);
      setIsPlaying(false);
      setCurrentPlaylist(null);
      stopProgressTracking();
    }
  };

  const handleSkip = (direction: 'forward' | 'backward') => {
    if (!audioRef.current) return;
    
    const skipAmount = 10; // seconds
    if (direction === 'forward') {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + skipAmount, audioRef.current.duration);
    } else {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - skipAmount, 0);
    }
    updateProgress();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleConnectSpotify = () => {
    console.log('Connecting to Spotify...');
    // TODO: Implement Spotify OAuth integration
  };

  const handleConnectYouTube = () => {
    console.log('Connecting to YouTube...');
    // TODO: Implement YouTube API integration
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Lofi Study Music</h3>
        <div className="flex items-center space-x-2">
          {isPlaying && (
            <div className="w-3 h-3 rounded-full bg-nature-green-500 animate-pulse" />
          )}
          <button 
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            data-testid="button-refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Main Play Button - Similar to Noise Generator */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => {
            if (currentPlaylist) {
              handlePlayPlaylist(currentPlaylist);
            } else {
              // Start first playlist if none selected
              handlePlayPlaylist(playlists[0].id);
            }
          }}
          className="w-16 h-16 bg-calm-blue-500 hover:bg-calm-blue-600 text-white rounded-full flex items-center justify-center text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          data-testid="button-main-play"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
      </div>

      {/* Volume Control - Similar to Noise Generator */}
      <div className="space-y-2 mb-6">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Volume2 className="w-4 h-4 mr-2" />
          Volume: <span className="ml-2 font-bold" data-testid="text-volume">{volume}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          data-testid="input-volume"
        />
      </div>
      
      {isPlaying && currentPlaylist && (
        <div className="mb-6 p-4 bg-nature-green-50 rounded-xl border border-nature-green-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-nature-green-800">Now Playing:</p>
              <p className="text-xs text-nature-green-600">
                {playlists.find(p => p.id === currentPlaylist)?.name}
              </p>
            </div>
          </div>
          
          {/* Audio Controls */}
          <div className="flex items-center justify-center space-x-4 mb-3">
            <button
              onClick={() => handleSkip('backward')}
              className="p-2 text-nature-green-600 hover:text-nature-green-700 transition-colors"
              data-testid="button-skip-backward"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handlePlayPlaylist(currentPlaylist)}
              className="p-3 bg-nature-green-500 hover:bg-nature-green-600 text-white rounded-full transition-colors"
              data-testid="button-main-play-pause"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => handleSkip('forward')}
              className="p-2 text-nature-green-600 hover:text-nature-green-700 transition-colors"
              data-testid="button-skip-forward"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={duration > 0 ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 bg-nature-green-200 rounded-lg appearance-none cursor-pointer"
              data-testid="input-progress"
            />
            <div className="flex justify-between text-xs text-nature-green-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {playlists.map((playlist) => {
          const isCurrentlyPlaying = isPlaying && currentPlaylist === playlist.id;
          return (
            <div
              key={playlist.id}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-colors cursor-pointer ${
                isCurrentlyPlaying 
                  ? 'bg-nature-green-100 border-2 border-nature-green-200' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => handlePlayPlaylist(playlist.id)}
              data-testid={`playlist-${playlist.id}`}
            >
              <img
                src={playlist.imageUrl}
                alt={`${playlist.name} cover`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className={`font-semibold ${isCurrentlyPlaying ? 'text-nature-green-800' : 'text-gray-900'}`} data-testid={`text-playlist-name-${playlist.id}`}>
                  {playlist.name}
                </h4>
                <p className={`text-sm ${isCurrentlyPlaying ? 'text-nature-green-600' : 'text-gray-600'}`} data-testid={`text-playlist-description-${playlist.id}`}>
                  {playlist.description}
                </p>
                <div className={`text-xs ${isCurrentlyPlaying ? 'text-nature-green-500' : 'text-gray-500'}`} data-testid={`text-playlist-duration-${playlist.id}`}>
                  {playlist.duration} • {playlist.tracks} tracks
                </div>
              </div>
              <button 
                className={`p-2 transition-colors ${
                  isCurrentlyPlaying 
                    ? 'text-nature-green-600 hover:text-nature-green-700' 
                    : 'text-calm-blue-500 hover:text-calm-blue-600'
                }`}
                data-testid={`button-play-${playlist.id}`}
              >
                {isCurrentlyPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          );
        })}
        
        <div className="border-t border-gray-200 pt-4 mt-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleConnectSpotify}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              data-testid="button-connect-spotify"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className="text-sm">Connect Spotify</span>
            </button>
            <button
              onClick={handleConnectYouTube}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              data-testid="button-connect-youtube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-sm">Connect YouTube</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
