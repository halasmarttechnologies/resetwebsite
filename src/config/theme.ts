export const themeConfig = {
  colors: {
    brandGold: "#D4AF37",
    brandBronze: "#C29B38",
    noirBackground: "#0B0B0C",
    noirSurface: "#161618",
    noirElevated: "#242429",
    noirBorder: "#27272A",
    textPrimary: "#F5F5F7",
    textSecondary: "#A1A1AA",
    textMuted: "#71717A",
  },
  transitions: {
    luxuryEase: [0.16, 1, 0.3, 1] as const,
    smoothEase: [0.4, 0, 0.2, 1] as const,
    durationFast: 0.2,
    durationNormal: 0.4,
    durationSlow: 0.8,
  },
} as const;
