import { Category, CATEGORIES } from '../types'
import CategoryButton from './CategoryButton'

interface Props {
  activeCategory: Category | null
  onCategoryClick: (category: Category) => void
}

export default function CategoryGrid({ activeCategory, onCategoryClick }: Props) {
  const isOdd = CATEGORIES.length % 2 !== 0
  const lastCategory = isOdd ? CATEGORIES[CATEGORIES.length - 1] : null
  const gridCategories = isOdd ? CATEGORIES.slice(0, -1) : CATEGORIES

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-3">
        {gridCategories.map((cat) => (
          <CategoryButton
            key={cat}
            category={cat}
            isActive={activeCategory === cat}
            onClick={onCategoryClick}
          />
        ))}
      </div>
      {lastCategory && (
        <div className="flex justify-center mt-3">
          <div className="w-1/2 px-0">
            <CategoryButton
              category={lastCategory}
              isActive={activeCategory === lastCategory}
              onClick={onCategoryClick}
            />
          </div>
        </div>
      )}
    </div>
  )
}
