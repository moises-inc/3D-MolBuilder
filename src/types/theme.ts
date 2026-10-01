/**
 * PIDE VcM 3D MolBuilder — Theme Configuration & Visual Styles
 * Universidad San Sebastián (USS) - Vinculación con el Medio
 *
 * Soporta 3 temas visuales intercambiables en tiempo real:
 * - 'academic': 'Clean Academic USS' (azul institucional USS #00205B, dorado #D4AF37, fondo slate suave, tipografía nítida).
 * - 'oled': 'Dark Cyber OLED' (fondo negro #09090b, bordes sutiles, acentos cian y ámbar neón).
 * - 'kiosk': 'Gamified Kiosk' (botones de alto impacto para ferias científicas, controles táctiles ampliados).
 */

export type ThemeId = 'academic' | 'oled' | 'kiosk';

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

export const THEMES: Record<ThemeId, ThemeConfig> = {
  academic: {
    id: 'academic',
    name: 'Clean Academic USS',
    shortName: 'Academic USS',
    tagline: 'Identidad Institucional USS — Elegancia & Rigor Científico',
    description: 'Azul institucional USS (#00205B), dorado (#D4AF37), fondo slate/neutro suave y tipografía de máxima nitidez para conferencias y presentaciones docentes.',
    colors: {
      primary: '#00205B',
      secondary: '#D4AF37',
      accent: '#D4AF37',
      background: '#0a1024',
      panel: 'rgba(15, 23, 42, 0.92)',
      card: '#0d1630',
      border: 'rgba(212, 175, 55, 0.35)',
      borderSubtle: 'rgba(30, 58, 138, 0.3)',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      badgeBg: 'rgba(0, 32, 91, 0.45)',
      badgeBorder: 'rgba(212, 175, 55, 0.4)',
      badgeText: '#fcd34d',
      glow: '0 0 20px rgba(212, 175, 55, 0.25)',
    },
    classes: {
      root: 'theme-academic bg-[#0a1024] text-slate-100',
      headerBg: 'bg-gradient-to-r from-[#001233] via-[#00205B] to-[#001233]',
      headerBorder: 'border-[#D4AF37]/40 shadow-md',
      cardBg: 'bg-[#0f1c3f]/90 backdrop-blur-md',
      cardBorder: 'border-[#D4AF37]/30 shadow-xl',
      panelBg: 'bg-[#0b1633]/90',
      panelBorder: 'border-blue-900/50',
      primaryButton: 'bg-gradient-to-r from-[#00205B] to-[#003380] hover:from-[#002d80] hover:to-[#004099] text-[#D4AF37] border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.2)] font-bold transition-all',
      secondaryButton: 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all',
      activeTab: 'border-[#D4AF37] text-[#D4AF37] bg-[#00205B]/30 shadow-inner font-bold',
      inactiveTab: 'border-transparent text-slate-400 hover:text-slate-200',
      accentText: 'text-[#D4AF37] font-semibold',
      accentTitle: 'text-[#D4AF37] font-bold tracking-wide',
      kioskButtonScale: '',
      triviaBanner: 'bg-gradient-to-r from-[#00205B]/90 via-[#0d2858]/85 to-[#00173d]/90 border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.18)]',
      triviaBannerTitle: 'text-[#D4AF37]',
      badgeKitStandard: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
      badgeKitFlexible: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
      badgeKitDigital: 'bg-blue-950/70 text-blue-300 border-blue-400/50',
      fastSelectorActive: 'bg-[#00205B]/60 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]',
      fastSelectorInactive: 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700',
    },
    erosionConfig: {
      hue: 215,
      saturation: 1.05,
      brightness: 0.78,
      speed: 0.8,
    },
  },
  oled: {
    id: 'oled',
    name: 'Dark Cyber OLED',
    shortName: 'Cyber OLED',
    tagline: 'Laboratorio Cyberpunk & Máximo Contraste Óptico',
    description: 'Fondo negro profundo (#09090b), bordes tenues, acentos cian (#5de1e5) y ámbar neón (#F97316) para monitores OLED y laboratorios oscurecidos.',
    colors: {
      primary: '#5de1e5',
      secondary: '#F97316',
      accent: '#F97316',
      background: '#09090b',
      panel: 'rgba(18, 18, 22, 0.88)',
      card: '#121216',
      border: 'rgba(249, 115, 22, 0.2)',
      borderSubtle: 'rgba(39, 39, 42, 0.6)',
      textPrimary: '#ffffff',
      textSecondary: '#e4e4e7',
      textMuted: '#a1a1aa',
      badgeBg: 'rgba(249, 115, 22, 0.15)',
      badgeBorder: 'rgba(249, 115, 22, 0.35)',
      badgeText: '#fb923c',
      glow: '0 0 20px rgba(249, 115, 22, 0.25)',
    },
    classes: {
      root: 'theme-oled bg-[#09090b] text-slate-100',
      headerBg: 'bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950',
      headerBorder: 'border-oled-border shadow-md',
      cardBg: 'bg-oled-card',
      cardBorder: 'border-oled-border shadow-2xl',
      panelBg: 'bg-oled-panel',
      panelBorder: 'border-oled-border',
      primaryButton: 'bg-orange-600 hover:bg-orange-500 text-black font-extrabold shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all',
      secondaryButton: 'bg-zinc-800/80 hover:bg-zinc-700 text-slate-300 border border-zinc-700 transition-all',
      activeTab: 'border-orange-500 text-orange-400 bg-orange-950/20 shadow-inner font-bold',
      inactiveTab: 'border-transparent text-slate-400 hover:text-slate-200',
      accentText: 'text-orange-400 font-bold',
      accentTitle: 'text-orange-400 font-bold tracking-wider',
      kioskButtonScale: '',
      triviaBanner: 'bg-zinc-950/90 border border-amber-500/40 shadow-lg',
      triviaBannerTitle: 'text-amber-400',
      badgeKitStandard: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
      badgeKitFlexible: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
      badgeKitDigital: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
      fastSelectorActive: 'bg-orange-500/20 border-orange-400 text-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.3)]',
      fastSelectorInactive: 'bg-oled-panel border-oled-border text-slate-400 hover:text-white hover:border-slate-600',
    },
    erosionConfig: {
      hue: -30,
      saturation: 1.2,
      brightness: 0.9,
      speed: 1.0,
    },
  },
  kiosk: {
    id: 'kiosk',
    name: 'Gamified Kiosk',
    shortName: 'Kiosk Feria',
    tagline: 'Feria Científica Escolar — Botones XL & Controles Táctiles',
    description: 'Botones táctiles sobredimensionados, tipografía aumentada de alto impacto para ferias científicas escolares y exhibiciones en pantallas gigantes o totems interactivos.',
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
  },
};

export const THEME_OPTIONS: Array<{
  id: ThemeId;
  label: string;
  badge: string;
  icon: string;
  description: string;
}> = [
  {
    id: 'academic',
    label: 'Academic USS',
    badge: 'USS #00205B',
    icon: '🎓',
    description: 'Azul institucional USS y dorado (#D4AF37). Estilo universitario sobrio.',
  },
  {
    id: 'oled',
    label: 'Cyber OLED',
    badge: '#09090b',
    icon: '⚡',
    description: 'Negro puro OLED con bordes sutiles y acentos cian/ámbar neón.',
  },
  {
    id: 'kiosk',
    label: 'Gamified Kiosk',
    badge: 'Touch XL',
    icon: '🎪',
    description: 'Botones ampliados de alto impacto para ferias y pantallas táctiles.',
  },
];

export const getThemeConfig = (id: ThemeId): ThemeConfig => {
  return THEMES[id] || THEMES.academic;
};
