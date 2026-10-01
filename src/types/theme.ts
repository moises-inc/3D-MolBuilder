/**
 * PIDE VcM 3D MolBuilder — Theme Configuration & Visual Styles
 * Universidad San Sebastián (USS) - Vinculación con el Medio
 *
 * Configuración consolidada exclusivamente en:
 * 'kiosk' — Gamified Kiosk (Alto contraste, botones táctiles XL y estética de feria escolar).
 */

export type ThemeId = 'kiosk' | 'academic' | 'oled';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  panel: string;
  card: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glow: string;
}

export interface ThemeClasses {
  root: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  panelBg: string;
  panelBorder: string;
  primaryButton: string;
  secondaryButton: string;
  activeTab: string;
  inactiveTab: string;
  accentText: string;
  accentTitle: string;
  kioskButtonScale: string;
  triviaBanner: string;
  triviaBannerTitle: string;
  badgeKitStandard: string;
  badgeKitFlexible: string;
  badgeKitDigital: string;
  fastSelectorActive: string;
  fastSelectorInactive: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  colors: ThemeColors;
  classes: ThemeClasses;
  erosionConfig: {
    hue: number;
    saturation: number;
    brightness: number;
    speed?: number;
  };
}

export const KIOSK_THEME: ThemeConfig = {
  id: 'kiosk',
  name: 'Gamified Kiosk',
  shortName: 'Kiosk Feria',
  tagline: 'Feria Científica Escolar — Botones XL & Controles Táctiles',
  description: 'Botones táctiles sobredimensionados, tipografía aumentada de alto impacto para ferias científicas escolares y exhibiciones en pantallas gigantes o tótems interactivos.',
  colors: {
    primary: '#38ef7d',
    secondary: '#fbbf24',
    accent: '#38ef7d',
    background: '#070b19',
    panel: 'rgba(13, 22, 44, 0.95)',
    card: '#0c152e',
    border: 'rgba(56, 239, 125, 0.4)',
    borderSubtle: 'rgba(59, 130, 246, 0.35)',
    textPrimary: '#ffffff',
    textSecondary: '#f1f5f9',
    textMuted: '#94a3b8',
    badgeBg: 'rgba(56, 239, 125, 0.2)',
    badgeBorder: 'rgba(56, 239, 125, 0.5)',
    badgeText: '#34d399',
    glow: '0 0 25px rgba(56, 239, 125, 0.35)',
  },
  classes: {
    root: 'theme-kiosk bg-[#070b19] text-white',
    headerBg: 'bg-gradient-to-r from-[#060b1e] via-[#0f1d40] to-[#060b1e]',
    headerBorder: 'border-emerald-500/50 shadow-lg',
    cardBg: 'bg-[#0c152e]/95 backdrop-blur-md',
    cardBorder: 'border-emerald-500/40 shadow-[0_0_25px_rgba(56,239,125,0.18)]',
    panelBg: 'bg-[#091126]/95',
    panelBorder: 'border-emerald-500/40',
    primaryButton: 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-sm sm:text-base py-3 px-6 rounded-2xl shadow-[0_0_20px_rgba(56,239,125,0.4)] active:scale-95 transition-transform',
    secondaryButton: 'bg-slate-800/90 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl border border-slate-600 transition-all',
    activeTab: 'border-emerald-400 text-emerald-300 bg-emerald-950/40 shadow-inner font-extrabold text-sm sm:text-base',
    inactiveTab: 'border-transparent text-slate-300 hover:text-white',
    accentText: 'text-emerald-300 font-extrabold',
    accentTitle: 'text-emerald-400 font-black tracking-wider text-base sm:text-lg',
    kioskButtonScale: 'scale-105 active:scale-95 text-base sm:text-lg py-3.5 px-6 rounded-2xl shadow-xl',
    triviaBanner: 'bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border-2 border-emerald-400/70 shadow-[0_0_25px_rgba(56,239,125,0.25)] p-4 sm:p-5',
    triviaBannerTitle: 'text-emerald-300 text-base sm:text-lg font-black',
    badgeKitStandard: 'bg-emerald-900/70 text-emerald-200 border-2 border-emerald-400 font-bold px-3 py-1',
    badgeKitFlexible: 'bg-amber-900/70 text-amber-200 border-2 border-amber-400 font-bold px-3 py-1',
    badgeKitDigital: 'bg-sky-900/70 text-sky-200 border-2 border-sky-400 font-bold px-3 py-1',
    fastSelectorActive: 'bg-emerald-500/30 border-2 border-emerald-400 text-emerald-200 shadow-[0_0_16px_rgba(56,239,125,0.4)] scale-105',
    fastSelectorInactive: 'bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500',
  },
  erosionConfig: {
    hue: 155,
    saturation: 1.35,
    brightness: 0.95,
    speed: 1.2,
  },
};

export const THEMES: Record<ThemeId, ThemeConfig> = {
  kiosk: KIOSK_THEME,
  academic: KIOSK_THEME,
  oled: KIOSK_THEME,
};

export const getThemeConfig = (_id?: ThemeId): ThemeConfig => {
  return KIOSK_THEME;
};
