import { Volume2, Clock, Wind, Music } from 'lucide-react';

interface QuickAccessToolbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function QuickAccessToolbar({ activeSection, onSectionChange }: QuickAccessToolbarProps) {
  const sections = [
    { id: 'noise', label: 'Noise', icon: Volume2 },
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'breathing', label: 'Breathing', icon: Wind },
    { id: 'playlists', label: 'Playlists', icon: Music },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Focus • Breathe • Achieve</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          A free productivity platform designed for exam-year students. Reduce stress and improve focus with science-backed tools.
        </p>
      </div>
      
      <nav className="flex flex-wrap justify-center gap-4 mb-8">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isActive
                  ? 'bg-calm-blue-500 text-white'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-white/30 hover:bg-white/90'
              }`}
              data-testid={`button-${section.id}`}
            >
              <Icon className="w-5 h-5" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
