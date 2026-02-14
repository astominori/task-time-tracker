import { CategoryConfig } from '../types'
import CategoryButton from './CategoryButton'

interface Props {
  categories: CategoryConfig[]
  activeCategoryId: string | null
  onCategoryClick: (categoryId: string) => void
}

export default function CategoryGrid({ categories, activeCategoryId, onCategoryClick }: Props) {
  const sorted = [...categories].sort((a, b) => a.order - b.order)
  const isOdd = sorted.length % 2 !== 0
  const lastCategory = isOdd ? sorted[sorted.length - 1] : null
  const gridCategories = isOdd ? sorted.slice(0, -1) : sorted

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-3">
        {gridCategories.map((cat) => (
          <CategoryButton
            key={cat.id}
            category={cat}
            isActive={activeCategoryId === cat.id}
            onClick={onCategoryClick}
          />
        ))}
      </div>
      {lastCategory && (
        <div className="flex justify-center mt-3">
          <div className="w-1/2 px-0">
            <CategoryButton
              category={lastCategory}
              isActive={activeCategoryId === lastCategory.id}
              onClick={onCategoryClick}
            />
          </div>
        </div>
      )}
    </div>
  )
}
