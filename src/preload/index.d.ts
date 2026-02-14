import { ElectronAPI } from '@electron-toolkit/preload'

interface TaskRecord {
  id: string
  category: string
  startTime: string
  endTime: string
  duration: number
}

interface Api {
  saveTask: (task: TaskRecord) => Promise<TaskRecord>
  getTodayTasks: () => Promise<TaskRecord[]>
}

declare global {
  interface Window {
    api: Api
  }
}
