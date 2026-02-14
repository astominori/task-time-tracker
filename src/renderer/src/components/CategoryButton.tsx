import { CategoryConfig } from '../types'
import { ICON_MAP } from '../constants/icons'

interface Props {
  category: CategoryConfig
  isActive: boolean
  onClick: (categoryId: string) => void
}

export default function CategoryButton({ category, isActive, onClick }: Props) {
  const Icon = ICON_MAP[category.icon]

  return (
    <button
      onClick={() => onClick(category.id)}
      style={{
        background: `linear-gradient(to bottom right, ${category.gradientFrom}, ${category.gradientTo})`
      }}
      className={`
        w-full py-3.5 px-4 rounded-xl text-white font-medium text-sm
        transition-all duration-200 cursor-pointer
        shadow-button hover:shadow-button-hover
        hover:-translate-y-0.5
        active:translate-y-0 active:scale-[0.97]
        ${isActive ? 'ring-2 ring-offset-2 ring-white/60 scale-[1.03] shadow-button-hover' : ''}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon size={18} strokeWidth={2} />}
        <span>{category.name}</span>
      </div>
    </button>
  )
}
