import { useState } from 'react';
import Header from '@/components/header';
import QuickAccessToolbar from '@/components/quick-access-toolbar';
import NoiseGenerator from '@/components/noise-generator';
import PomodoroTimer from '@/components/pomodoro-timer';
import BreathingGuide from '@/components/breathing-guide';
import StudyPlaylists from '@/components/study-playlists';
import { useTheme } from '@/hooks/use-theme';
import { Slider } from '@/components/ui/slider';
import { Eye, ChevronDown } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('noise');
  const [backgroundOpacity, setBackgroundOpacity] = useState([30]);
  const [showOpacityControl, setShowOpacityControl] = useState(false);
  const { themeConfig } = useTheme();

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'noise':
        return <NoiseGenerator />;
      case 'timer':
        return <PomodoroTimer />;
      case 'breathing':
        return <BreathingGuide />;
      case 'playlists':
        return <StudyPlaylists />;
      default:
        return <NoiseGenerator />;
    }
  };

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      <Header />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('${themeConfig.backgroundImage}')`,
            opacity: backgroundOpacity[0] / 100
          }}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${themeConfig.primaryGradient}`}
          style={{ opacity: Math.max(0, (100 - backgroundOpacity[0]) / 100) }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Background Opacity Control Dropdown */}
          <div className="fixed top-20 right-4 z-50">
            <button
              onClick={() => setShowOpacityControl(!showOpacityControl)}
              className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-white/30 p-3 flex items-center space-x-2 hover:bg-white/95 transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {backgroundOpacity[0]}%
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showOpacityControl ? 'rotate-180' : ''}`} />
            </button>
            
            {showOpacityControl && (
              <div className="absolute top-full mt-2 right-0 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-white/30 p-4 w-64">
                <div className="flex items-center space-x-3 mb-3">
                  <Eye className="w-4 h-4 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">
                    Background Opacity: {backgroundOpacity[0]}%
                  </label>
                </div>
                <Slider
                  value={backgroundOpacity}
                  onValueChange={setBackgroundOpacity}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <QuickAccessToolbar activeSection={activeSection} onSectionChange={setActiveSection} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {renderActiveComponent()}
            
            {activeSection !== 'noise' && (
              <div className="lg:block hidden">
                <NoiseGenerator />
              </div>
            )}
            
            {activeSection !== 'timer' && (
              <div className="lg:block hidden">
                <PomodoroTimer />
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About StudyZen</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                A free, evidence-based productivity platform designed specifically for exam-year students. 
                Combining proven techniques for stress reduction and focus improvement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Research-Backed</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Brown noise studies (Cleveland Clinic)</li>
                <li>• Pomodoro Technique effectiveness</li>
                <li>• Mindfulness research (BMC Psychology)</li>
                <li>• Cognitive flexibility benefits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Students</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Ages 15-19</li>
                <li>• Exam preparation focus</li>
                <li>• Stress reduction tools</li>
                <li>• Free forever</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              StudyZen © 2025 • Free Student Productivity Platform • 
              <span className="text-calm-blue-600"> Made with ❤️ for students</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              a design project made by yiming M5
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
