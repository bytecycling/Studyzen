import { Brain } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Header() {
  const { currentTheme, themeConfig, changeTheme, availableThemes } = useTheme();

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 bg-gradient-to-br ${themeConfig.secondaryGradient} rounded-lg flex items-center justify-center shadow-lg`}>
              <Brain className="text-white text-sm w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">StudyZen</h1>
            <span className="text-xs bg-emerald-100/80 text-emerald-800 px-2 py-1 rounded-full font-medium backdrop-blur-sm">
              FREE
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Theme:</span>
              <Select value={currentTheme} onValueChange={(value) => changeTheme(value as Theme)}>
                <SelectTrigger 
                  className="text-sm border border-white/30 rounded-lg px-3 py-1 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-calm-blue-500 w-auto"
                  data-testid="select-theme"
                >
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {availableThemes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id} data-testid={`option-${theme.id}`}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
