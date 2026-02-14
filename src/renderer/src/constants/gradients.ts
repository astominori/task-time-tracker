export interface GradientPreset {
  gradientFrom: string
  gradientTo: string
  accent: string
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { gradientFrom: '#3b82f6', gradientTo: '#6366f1', accent: '#3b82f6' }, // Blue → Indigo
  { gradientFrom: '#10b981', gradientTo: '#06b6d4', accent: '#10b981' }, // Emerald → Cyan
  { gradientFrom: '#8b5cf6', gradientTo: '#a855f7', accent: '#8b5cf6' }, // Violet → Purple
  { gradientFrom: '#f59e0b', gradientTo: '#f97316', accent: '#f59e0b' }, // Amber → Orange
  { gradientFrom: '#6b7280', gradientTo: '#9ca3af', accent: '#6b7280' }, // Gray
  { gradientFrom: '#ef4444', gradientTo: '#f43f5e', accent: '#ef4444' }, // Red → Rose
  { gradientFrom: '#ec4899', gradientTo: '#d946ef', accent: '#ec4899' }, // Pink → Fuchsia
  { gradientFrom: '#14b8a6', gradientTo: '#22d3ee', accent: '#14b8a6' }, // Teal → Cyan
  { gradientFrom: '#f97316', gradientTo: '#eab308', accent: '#f97316' }, // Orange → Yellow
  { gradientFrom: '#0ea5e9', gradientTo: '#2dd4bf', accent: '#0ea5e9' }  // Sky → Teal
]
