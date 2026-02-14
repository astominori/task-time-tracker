import { Timer } from 'lucide-react'
import { CategoryConfig } from '../types'
import { ICON_MAP } from '../constants/icons'

interface Props {
  activeCategoryId: string | null
  categories: CategoryConfig[]
  formattedTime: string
}

export default function TimerDisplay({ activeCategoryId, categories, formattedTime }: Props) {
  const [h, m, s] = formattedTime.split(':')
  const isActive = activeCategoryId !== null
  const activeCategory = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)
    : null

  const CategoryIcon = activeCategory ? ICON_MAP[activeCategory.icon] : null
  const accentColor = activeCategory ? activeCategory.accent : undefined

  return (
    <div className="text-center py-6 px-4">
      {isActive && CategoryIcon && activeCategory && (
        <div className="flex items-center justify-center gap-2 mb-3 animate-fade-in">
          <CategoryIcon size={18} style={{ color: accentColor }} />
          <span className="text-sm font-medium text-text-secondary">{activeCategory.name}</span>
        </div>
      )}

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

      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Timer size={13} className="text-text-tertiary" />
        <span className="text-xs text-text-tertiary">
          {isActive ? '計測中... もう一度クリックで停止' : 'カテゴリを選んで計測開始'}
        </span>
      </div>
    </div>
  )
}
