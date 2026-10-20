export type ThemeId = 'sunset-bronze' | 'obsidian-crimson' | 'racing-emerald' | 'electric-cyan';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  posterLabel: string;
  posterFile: string;
  quote: string;
  primary: string;
  primaryRgb: string;
  primaryLight: string;
  primaryDark: string;
  accentBar: string;
  bgBase: string;
  bgSurface: string;
  bgCard: string;
  borderSubtle: string;
  borderFocus: string;
  glow: string;
  badgeBg: string;
  btnBg: string;
  btnText: string;
  btnBorder: string;
  waterlineColor: string;
  selectionBg: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'sunset-bronze': {
    id: 'sunset-bronze',
    name: 'Sunset Bronze',
    posterLabel: 'Poster 3 (Sunset Amber)',
    posterFile: '/assets/aistudio/Corner3_de23fe95.png',
    quote: 'Cleaner. Shinier. Better.',
    primary: '#D4AF37',
    primaryRgb: '212, 175, 55',
    primaryLight: '#FCE7A6',
    primaryDark: '#855E12',
    accentBar: '#C59B6D',
    bgBase: '#0A0908',
    bgSurface: '#141210',
    bgCard: '#1B1815',
    borderSubtle: 'rgba(212, 175, 55, 0.22)',
    borderFocus: 'rgba(212, 175, 55, 0.65)',
    glow: 'rgba(212, 175, 55, 0.35)',
    badgeBg: 'rgba(212, 175, 55, 0.12)',
    btnBg: 'linear-gradient(135deg, #D4AF37 0%, #C59B6D 50%, #B47C44 100%)',
    btnText: '#0A0908',
    btnBorder: '#C59B6D',
    waterlineColor: 'rgba(212, 175, 55, 0.55)',
    selectionBg: '#C59B6D',
  },
  'obsidian-crimson': {
    id: 'obsidian-crimson',
    name: 'Obsidian Crimson',
    posterLabel: 'Poster 1 (Ruby Crimson)',
    posterFile: '/assets/aistudio/Corner1_857fb3c2.png',
    quote: 'The finish is in the details.',
    primary: '#BE123C',
    primaryRgb: '190, 18, 60',
    primaryLight: '#FDA4AF',
    primaryDark: '#4C0519',
    accentBar: '#A61C2E',
    bgBase: '#08080A',
    bgSurface: '#111115',
    bgCard: '#18181E',
    borderSubtle: 'rgba(190, 18, 60, 0.24)',
    borderFocus: 'rgba(190, 18, 60, 0.7)',
    glow: 'rgba(190, 18, 60, 0.38)',
    badgeBg: 'rgba(190, 18, 60, 0.12)',
    btnBg: 'linear-gradient(135deg, #BE123C 0%, #9F1239 100%)',
    btnText: '#FFFFFF',
    btnBorder: '#BE123C',
    waterlineColor: 'rgba(190, 18, 60, 0.55)',
    selectionBg: '#BE123C',
  },
  'racing-emerald': {
    id: 'racing-emerald',
    name: 'Racing Emerald',
    posterLabel: 'Poster 2 (Atelier Green)',
    posterFile: '/assets/aistudio/Corner2_1005170c.png',
    quote: 'Premium Car Care',
    primary: '#10B981',
    primaryRgb: '16, 185, 129',
    primaryLight: '#A7F3D0',
    primaryDark: '#064E3B',
    accentBar: '#0F4A33',
    bgBase: '#070C09',
    bgSurface: '#0E1712',
    bgCard: '#13211A',
    borderSubtle: 'rgba(16, 185, 129, 0.22)',
    borderFocus: 'rgba(16, 185, 129, 0.65)',
    glow: 'rgba(16, 185, 129, 0.35)',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    btnBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    btnText: '#062015',
    btnBorder: '#10B981',
    waterlineColor: 'rgba(16, 185, 129, 0.55)',
    selectionBg: '#10B981',
  },
  'electric-cyan': {
    id: 'electric-cyan',
    name: 'Midnight Cyan',
    posterLabel: 'Classic Electric Waterline',
    posterFile: '',
    quote: 'Spot-free mobile shine',
    primary: '#00E5FF',
    primaryRgb: '0, 229, 255',
    primaryLight: '#A5F3FC',
    primaryDark: '#083344',
    accentBar: '#06B6D4',
    bgBase: '#07090E',
    bgSurface: '#0D111A',
    bgCard: '#121824',
    borderSubtle: 'rgba(0, 229, 255, 0.22)',
    borderFocus: 'rgba(0, 229, 255, 0.65)',
    glow: 'rgba(0, 229, 255, 0.35)',
    badgeBg: 'rgba(0, 229, 255, 0.12)',
    btnBg: 'linear-gradient(135deg, #00E5FF 0%, #06B6D4 100%)',
    btnText: '#07090E',
    btnBorder: '#00E5FF',
    waterlineColor: 'rgba(0, 229, 255, 0.55)',
    selectionBg: '#06B6D4',
  },
};
