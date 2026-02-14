import { ipcMain } from 'electron'
import Store from 'electron-store'

interface TaskRecord {
  id: string
  category: string
  startTime: string
  endTime: string
  duration: number
}

interface StoreSchema {
  tasks: TaskRecord[]
}

const store = new Store<StoreSchema>({
  defaults: {
    tasks: []
  }
})

export function registerStoreHandlers(): void {
  ipcMain.handle('save-task', (_event, task: TaskRecord) => {
    const tasks = store.get('tasks', [])
    tasks.push(task)
    store.set('tasks', tasks)
    return task
  })

  ipcMain.handle('get-today-tasks', () => {
    const tasks = store.get('tasks', [])
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayStartISO = todayStart.toISOString()

    return tasks.filter((t) => t.startTime >= todayStartISO)
  })
}
