import { Play, Pause, Volume2 } from 'lucide-react';
import { useAudio } from '@/hooks/use-audio';

export default function NoiseGenerator() {
  const { isPlaying, volume, noiseType, togglePlayPause, changeNoiseType, updateVolume } = useAudio();

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Noise Generator</h3>
        <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-nature-green-500 animate-pulse' : 'bg-gray-300'}`} />
      </div>
      
      <div className="space-y-6">
        <div className="flex space-x-4">
          <button
            onClick={() => changeNoiseType('brown')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium border-2 transition-all duration-300 ${
              noiseType === 'brown'
                ? 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
            data-testid="button-brown-noise"
          >
            Brown Noise
          </button>
          <button
            onClick={() => changeNoiseType('white')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium border-2 transition-all duration-300 ${
              noiseType === 'white'
                ? 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
            data-testid="button-white-noise"
          >
            White Noise
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 bg-calm-blue-500 hover:bg-calm-blue-600 text-white rounded-full flex items-center justify-center text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Volume2 className="w-4 h-4 mr-2" />
              Volume: <span className="ml-2 font-bold" data-testid="text-volume">{volume}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => updateVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              data-testid="input-volume"
            />
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>
            <strong>Brown noise</strong> masks distracting sounds and reduces anxiety, helping improve concentration.
          </p>
        </div>
      </div>
    </div>
  );
}
