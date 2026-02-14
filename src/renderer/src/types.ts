export type Category = '資格勉強' | 'ブログ記事' | '開発' | '読書' | 'その他'

export interface TaskRecord {
  id: string
  category: Category
  startTime: string
  endTime: string
  duration: number
}

export const CATEGORIES: Category[] = ['資格勉強', 'ブログ記事', '開発', '読書', 'その他']

export const CATEGORY_COLORS: Record<Category, string> = {
  '資格勉強': 'bg-blue-500 hover:bg-blue-600',
  'ブログ記事': 'bg-green-500 hover:bg-green-600',
  '開発': 'bg-purple-500 hover:bg-purple-600',
  '読書': 'bg-orange-500 hover:bg-orange-600',
  'その他': 'bg-gray-500 hover:bg-gray-600'
}

export const CATEGORY_EMOJIS: Record<Category, string> = {
  '資格勉強': '📝',
  'ブログ記事': '✍️',
  '開発': '💻',
  '読書': '📚',
  'その他': '🔧'
}
