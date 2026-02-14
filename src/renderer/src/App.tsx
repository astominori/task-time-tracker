import { useState, useEffect, useCallback } from 'react'
import { Clock, Settings } from 'lucide-react'
import { CategoryConfig, TaskRecord } from './types'
import { useTimer } from './hooks/useTimer'
import TimerDisplay from './components/TimerDisplay'
import CategoryGrid from './components/CategoryGrid'
import TaskHistory from './components/TaskHistory'
import ThemeToggle from './components/ThemeToggle'
import SettingsModal from './components/SettingsModal'

export default function App() {
  const [categories, setCategories] = useState<CategoryConfig[]>([])
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [todayTasks, setTodayTasks] = useState<TaskRecord[]>([])
  const [showSettings, setShowSettings] = useState(false)

  const { elapsed, formatTime } = useTimer(activeCategoryId !== null, startTime)

  useEffect(() => {
    window.api.getCategories().then(setCategories)
    window.api.getTodayTasks().then(setTodayTasks)
  }, [])

  const handleCategoryClick = useCallback(
    async (categoryId: string) => {
      const category = categories.find((c) => c.id === categoryId)
      if (!category) return

      if (activeCategoryId === categoryId) {
        // Stop timer
        const now = Date.now()
        const duration = now - startTime!
        const task: TaskRecord = {
          id: crypto.randomUUID(),
          categoryId: category.id,
          categoryName: category.name,
          startTime: new Date(startTime!).toISOString(),
          endTime: new Date(now).toISOString(),
          duration
        }

        await window.api.saveTask(task)
        setTodayTasks((prev) => [...prev, task])
        setActiveCategoryId(null)
        setStartTime(null)
      } else if (activeCategoryId === null) {
        // Start timer
        setActiveCategoryId(categoryId)
        setStartTime(Date.now())
      } else {
        // Switch: stop current, start new
        const now = Date.now()
        const duration = now - startTime!
        const prevCategory = categories.find((c) => c.id === activeCategoryId)
        const task: TaskRecord = {
          id: crypto.randomUUID(),
          categoryId: activeCategoryId,
          categoryName: prevCategory?.name || '',
          startTime: new Date(startTime!).toISOString(),
          endTime: new Date(now).toISOString(),
          duration
        }

        await window.api.saveTask(task)
        setTodayTasks((prev) => [...prev, task])
        setActiveCategoryId(categoryId)
        setStartTime(Date.now())
      }
    },
    [activeCategoryId, startTime, categories]
  )

  const handleSaveCategories = useCallback(
    async (updated: CategoryConfig[]) => {
      await window.api.saveCategories(updated)
      setCategories(updated)
    },
    []
  )

  return (
    <div className="min-h-screen bg-surface pt-8 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 mb-2">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-text-secondary" />
            <h1 className="text-base font-semibold text-text-primary tracking-tight">
              Task Time Tracker
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSettings(true)}
              className="p-1.5 rounded-lg bg-surface-secondary hover:bg-surface-hover transition-colors duration-200 cursor-pointer"
              title="カテゴリ設定"
            >
              <Settings size={16} className="text-text-secondary" />
            </button>
            <ThemeToggle />
          </div>
        </div>

        <TimerDisplay
          activeCategoryId={activeCategoryId}
          categories={categories}
          formattedTime={formatTime(elapsed)}
        />
        <CategoryGrid
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryClick={handleCategoryClick}
        />
        <TaskHistory tasks={todayTasks} categories={categories} formatTime={formatTime} />
      </div>

      {showSettings && (
        <SettingsModal
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSave={handleSaveCategories}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
