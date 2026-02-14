import { Category, CATEGORY_EMOJIS } from '../types'

interface Props {
  activeCategory: Category | null
  formattedTime: string
}

export default function TimerDisplay({ activeCategory, formattedTime }: Props) {
  return (
    <div className="text-center py-6">
      {activeCategory ? (
        <>
          <div className="text-lg text-gray-600 mb-2">
            {CATEGORY_EMOJIS[activeCategory]} {activeCategory}
          </div>
          <div className="text-5xl font-mono font-bold text-gray-900 tracking-wider">
            {formattedTime}
          </div>
          <div className="text-sm text-gray-400 mt-2">計測中... もう一度クリックで停止</div>
        </>
      ) : (
        <>
          <div className="text-5xl font-mono font-bold text-gray-300 tracking-wider">
            00:00:00
          </div>
          <div className="text-sm text-gray-400 mt-2">カテゴリを選んで計測開始</div>
        </>
      )}
    </div>
  )
}
