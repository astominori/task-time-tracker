import { Category, CATEGORY_COLORS, CATEGORY_EMOJIS } from '../types'

interface Props {
  category: Category
  isActive: boolean
  onClick: (category: Category) => void
}

export default function CategoryButton({ category, isActive, onClick }: Props) {
  const baseColor = CATEGORY_COLORS[category]

  return (
    <button
      onClick={() => onClick(category)}
      className={`
        w-full py-4 px-4 rounded-xl text-white font-medium text-base
        transition-all duration-200 cursor-pointer
        ${baseColor}
        ${isActive ? 'ring-4 ring-offset-2 ring-yellow-400 scale-105 shadow-lg' : 'shadow-md'}
      `}
    >
      <span className="text-xl mr-2">{CATEGORY_EMOJIS[category]}</span>
      {category}
    </button>
  )
}
