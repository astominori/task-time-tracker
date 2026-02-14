import { Timer } from 'lucide-react'
import { Category, CATEGORY_ICONS, CATEGORY_ACCENT_VAR } from '../types'

interface Props {
  activeCategory: Category | null
  formattedTime: string // "HH:MM:SS"
}

export default function TimerDisplay({ activeCategory, formattedTime }: Props) {
  const [h, m, s] = formattedTime.split(':')
  const isActive = activeCategory !== null

  const CategoryIcon = activeCategory ? CATEGORY_ICONS[activeCategory] : null
  const accentColor = activeCategory ? CATEGORY_ACCENT_VAR[activeCategory] : undefined

  return (
    <div className="text-center py-6 px-4">
      {/* Category indicator */}
      {isActive && CategoryIcon && (
        <div className="flex items-center justify-center gap-2 mb-3 animate-fade-in">
          <CategoryIcon size={18} style={{ color: accentColor }} />
          <span className="text-sm font-medium text-text-secondary">{activeCategory}</span>
        </div>
      )}

      {/* Timer digits */}
      <div className={`flex items-baseline justify-center gap-1 ${isActive ? 'animate-pulse-slow' : ''}`}>
        <div className="flex flex-col items-center">
          <span
            className={`text-5xl font-mono font-bold tracking-tight ${
              isActive ? 'text-text-primary' : 'text-text-tertiary'
            }`}
          >
            {h}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary mt-1">hr</span>
        </div>

        <span className={`text-4xl font-mono font-bold -translate-y-0.5 ${isActive ? 'text-text-primary' : 'text-text-tertiary'}`}>:</span>

        <div className="flex flex-col items-center">
          <span
            className={`text-5xl font-mono font-bold tracking-tight ${
              isActive ? 'text-text-primary' : 'text-text-tertiary'
            }`}
          >
            {m}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary mt-1">min</span>
        </div>

        <span className={`text-4xl font-mono font-bold -translate-y-0.5 ${isActive ? 'text-text-primary' : 'text-text-tertiary'}`}>:</span>

        <div className="flex flex-col items-center">
          <span
            className={`text-5xl font-mono font-bold tracking-tight ${
              isActive ? 'text-text-primary' : 'text-text-tertiary'
            }`}
          >
            {s}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary mt-1">sec</span>
        </div>
      </div>

      {/* Status hint */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Timer size={13} className="text-text-tertiary" />
        <span className="text-xs text-text-tertiary">
          {isActive ? '計測中... もう一度クリックで停止' : 'カテゴリを選んで計測開始'}
        </span>
      </div>
    </div>
  )
}
