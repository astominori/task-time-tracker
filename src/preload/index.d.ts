import { ElectronAPI } from '@electron-toolkit/preload'

interface CategoryConfig {
  id: string
  name: string
  icon: string
  gradientFrom: string
  gradientTo: string
  accent: string
  order: number
}

interface TaskRecord {
  id: string
  categoryId: string
  categoryName: string
  startTime: string
  endTime: string
  duration: number
}

interface Api {
  saveTask: (task: TaskRecord) => Promise<TaskRecord>
  getTodayTasks: () => Promise<TaskRecord[]>
  getCategories: () => Promise<CategoryConfig[]>
  saveCategories: (categories: CategoryConfig[]) => Promise<CategoryConfig[]>
}

declare global {
  interface Window {
    api: Api
  }
}
