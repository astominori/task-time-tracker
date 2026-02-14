import { contextBridge, ipcRenderer } from 'electron'

const api = {
  saveTask: (task: {
    id: string
    category: string
    startTime: string
    endTime: string
    duration: number
  }) => ipcRenderer.invoke('save-task', task),

  getTodayTasks: () => ipcRenderer.invoke('get-today-tasks')
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
} else {
  // @ts-expect-error fallback for non-isolated context
  window.api = api
}
