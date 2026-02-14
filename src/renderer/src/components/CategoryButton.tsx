import { Category, CATEGORY_GRADIENTS, CATEGORY_ICONS } from '../types'

interface Props {
  category: Category
  isActive: boolean
  onClick: (category: Category) => void
}

export default function CategoryButton({ category, isActive, onClick }: Props) {
  const gradient = CATEGORY_GRADIENTS[category]
  const Icon = CATEGORY_ICONS[category]

  return (
    <button
      onClick={() => onClick(category)}
      className={`
        w-full py-3.5 px-4 rounded-xl text-white font-medium text-sm
        bg-gradient-to-br ${gradient}
        transition-all duration-200 cursor-pointer
        shadow-button hover:shadow-button-hover
        hover:-translate-y-0.5
        active:translate-y-0 active:scale-[0.97]
        ${isActive ? 'ring-2 ring-offset-2 ring-white/60 scale-[1.03] shadow-button-hover' : ''}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon size={18} strokeWidth={2} />
        <span>{category}</span>
      </div>
    </button>
  )
}
