import { Category, CATEGORIES } from '../types'
import CategoryButton from './CategoryButton'

interface Props {
  activeCategory: Category | null
  onCategoryClick: (category: Category) => void
}

export default function CategoryGrid({ activeCategory, onCategoryClick }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {CATEGORIES.map((cat) => (
        <CategoryButton
          key={cat}
          category={cat}
          isActive={activeCategory === cat}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  )
}
