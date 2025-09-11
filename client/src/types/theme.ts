export type Theme = 'forest-calm' | 'ocean-blue' | 'minimal-white' | 'sunset-warm';

export interface ThemeConfig {
  id: Theme;
  name: string;
  backgroundImage: string;
  primaryGradient: string;
  secondaryGradient: string;
}

export const themes: Record<Theme, ThemeConfig> = {
  'forest-calm': {
    id: 'forest-calm',
    name: 'Forest Calm',
    backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&h=1440',
    primaryGradient: 'from-emerald-50/95 to-green-50/95',
    secondaryGradient: 'from-emerald-200/80 to-green-200/80',
  },
  'ocean-blue': {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    backgroundImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&h=1440',
    primaryGradient: 'from-blue-50/95 to-cyan-50/95',
    secondaryGradient: 'from-blue-200/80 to-cyan-200/80',
  },
  'minimal-white': {
    id: 'minimal-white',
    name: 'Minimal White',
    backgroundImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&h=1440',
    primaryGradient: 'from-slate-50/95 to-gray-50/95',
    secondaryGradient: 'from-slate-200/80 to-gray-200/80',
  },
  'sunset-warm': {
    id: 'sunset-warm',
    name: 'Sunset Warm',
    backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&h=1440',
    primaryGradient: 'from-orange-50/95 to-rose-50/95',
    secondaryGradient: 'from-orange-200/80 to-rose-200/80',
  },
};
