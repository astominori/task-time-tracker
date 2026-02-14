import type { LucideIcon } from 'lucide-react'
import { GraduationCap, PenLine, Code2, BookOpen, Wrench } from 'lucide-react'

export type Category = '資格勉強' | 'ブログ記事' | '開発' | '読書' | 'その他'

export interface TaskRecord {
  id: string
  category: Category
  startTime: string
  endTime: string
  duration: number
}

export const CATEGORIES: Category[] = ['資格勉強', 'ブログ記事', '開発', '読書', 'その他']

export const CATEGORY_GRADIENTS: Record<Category, string> = {
  '資格勉強': 'from-cat-study-from to-cat-study-to',
  'ブログ記事': 'from-cat-blog-from to-cat-blog-to',
  '開発': 'from-cat-dev-from to-cat-dev-to',
  '読書': 'from-cat-read-from to-cat-read-to',
  'その他': 'from-cat-other-from to-cat-other-to'
}

export const CATEGORY_ACCENT_VAR: Record<Category, string> = {
  '資格勉強': 'var(--color-cat-study-accent)',
  'ブログ記事': 'var(--color-cat-blog-accent)',
  '開発': 'var(--color-cat-dev-accent)',
  '読書': 'var(--color-cat-read-accent)',
  'その他': 'var(--color-cat-other-accent)'
}

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  '資格勉強': GraduationCap,
  'ブログ記事': PenLine,
  '開発': Code2,
  '読書': BookOpen,
  'その他': Wrench
}
