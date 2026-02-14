import { contextBridge, ipcRenderer } from 'electron'

const api = {
  saveTask: (task: {
    id: string
    categoryId: string
    categoryName: string
    startTime: string
    endTime: string
    duration: number
  }) => ipcRenderer.invoke('save-task', task),

  getTodayTasks: () => ipcRenderer.invoke('get-today-tasks'),

  getCategories: () => ipcRenderer.invoke('get-categories'),

  saveCategories: (
    categories: {
      id: string
      name: string
      icon: string
      gradientFrom: string
      gradientTo: string
      accent: string
      order: number
    }[]
  ) => ipcRenderer.invoke('save-categories', categories)
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
} else {
  // @ts-expect-error fallback for non-isolated context
  window.api = api
}
