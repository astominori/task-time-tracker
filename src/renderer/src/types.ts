export interface CategoryConfig {
  id: string
  name: string
  icon: string
  gradientFrom: string
  gradientTo: string
  accent: string
  order: number
}

export interface TaskRecord {
  id: string
  categoryId: string
  categoryName: string
  startTime: string
  endTime: string
  duration: number
}
