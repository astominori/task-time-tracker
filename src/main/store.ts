import { ipcMain } from 'electron'
import Store from 'electron-store'

export interface CategoryConfig {
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

// Legacy format for migration
interface LegacyTaskRecord {
  id: string
  category: string
  startTime: string
  endTime: string
  duration: number
}

interface StoreSchema {
  tasks: TaskRecord[]
  categories: CategoryConfig[]
}

const DEFAULT_CATEGORIES: CategoryConfig[] = [
  {
    id: 'default-study',
    name: '資格勉強',
    icon: 'GraduationCap',
    gradientFrom: '#3b82f6',
    gradientTo: '#6366f1',
    accent: '#3b82f6',
    order: 0
  },
  {
    id: 'default-blog',
    name: 'ブログ記事',
    icon: 'PenLine',
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    accent: '#10b981',
    order: 1
  },
  {
    id: 'default-dev',
    name: '開発',
    icon: 'Code2',
    gradientFrom: '#8b5cf6',
    gradientTo: '#a855f7',
    accent: '#8b5cf6',
    order: 2
  },
  {
    id: 'default-read',
    name: '読書',
    icon: 'BookOpen',
    gradientFrom: '#f59e0b',
    gradientTo: '#f97316',
    accent: '#f59e0b',
    order: 3
  },
  {
    id: 'default-other',
    name: 'その他',
    icon: 'Wrench',
    gradientFrom: '#6b7280',
    gradientTo: '#9ca3af',
    accent: '#6b7280',
    order: 4
  }
]

// Map legacy category names to default category IDs
const LEGACY_NAME_TO_ID: Record<string, string> = {
  資格勉強: 'default-study',
  ブログ記事: 'default-blog',
  開発: 'default-dev',
  読書: 'default-read',
  その他: 'default-other'
}

const store = new Store<StoreSchema>({
  defaults: {
    tasks: [],
    categories: DEFAULT_CATEGORIES
  }
})

function migrateLegacyTasks(): void {
  const tasks = store.get('tasks', []) as (TaskRecord | LegacyTaskRecord)[]
  let migrated = false

  const newTasks = tasks.map((t) => {
    // Already migrated
    if ('categoryId' in t && t.categoryId) return t as TaskRecord

    const legacy = t as LegacyTaskRecord
    migrated = true
    const categoryId = LEGACY_NAME_TO_ID[legacy.category] || 'default-other'
    return {
      id: legacy.id,
      categoryId,
      categoryName: legacy.category,
      startTime: legacy.startTime,
      endTime: legacy.endTime,
      duration: legacy.duration
    } as TaskRecord
  })

  if (migrated) {
    store.set('tasks', newTasks)
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/
const ICON_NAME_RE = /^[A-Za-z0-9]{1,40}$/

function isValidTaskRecord(t: unknown): t is TaskRecord {
  if (!t || typeof t !== 'object') return false
  const r = t as Record<string, unknown>
  return (
    typeof r.id === 'string' && UUID_RE.test(r.id) &&
    typeof r.categoryId === 'string' && r.categoryId.length <= 64 &&
    typeof r.categoryName === 'string' && r.categoryName.length <= 100 &&
    typeof r.startTime === 'string' && ISO_DATE_RE.test(r.startTime) &&
    typeof r.endTime === 'string' && ISO_DATE_RE.test(r.endTime) &&
    typeof r.duration === 'number' && r.duration >= 0 && r.duration <= 86_400_000
  )
}

function isValidCategoryConfig(c: unknown): c is CategoryConfig {
  if (!c || typeof c !== 'object') return false
  const r = c as Record<string, unknown>
  return (
    typeof r.id === 'string' && r.id.length <= 64 &&
    typeof r.name === 'string' && r.name.length >= 1 && r.name.length <= 100 &&
    typeof r.icon === 'string' && ICON_NAME_RE.test(r.icon) &&
    typeof r.gradientFrom === 'string' && HEX_COLOR_RE.test(r.gradientFrom) &&
    typeof r.gradientTo === 'string' && HEX_COLOR_RE.test(r.gradientTo) &&
    typeof r.accent === 'string' && HEX_COLOR_RE.test(r.accent) &&
    typeof r.order === 'number' && Number.isInteger(r.order) && r.order >= 0
  )
}

export function registerStoreHandlers(): void {
  // Run migration on startup
  migrateLegacyTasks()

  ipcMain.handle('save-task', (_event, task: unknown) => {
    if (!isValidTaskRecord(task)) {
      throw new Error('Invalid task data')
    }
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

  ipcMain.handle('get-categories', () => {
    return store.get('categories', DEFAULT_CATEGORIES)
  })

  ipcMain.handle('save-categories', (_event, categories: unknown) => {
    if (!Array.isArray(categories) || categories.length > 50) {
      throw new Error('Invalid categories data')
    }
    const validated = categories.filter(isValidCategoryConfig)
    if (validated.length !== categories.length) {
      throw new Error('One or more categories contain invalid data')
    }
    store.set('categories', validated)
    return validated
  })
}
