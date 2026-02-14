import { useState, useEffect, useCallback } from 'react'
import { Clock } from 'lucide-react'
import { Category, TaskRecord } from './types'
import { useTimer } from './hooks/useTimer'
import TimerDisplay from './components/TimerDisplay'
import CategoryGrid from './components/CategoryGrid'
import TaskHistory from './components/TaskHistory'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [todayTasks, setTodayTasks] = useState<TaskRecord[]>([])

  const { elapsed, formatTime } = useTimer(activeCategory !== null, startTime)

  useEffect(() => {
    window.api.getTodayTasks().then(setTodayTasks)
  }, [])

  const handleCategoryClick = useCallback(
    async (category: Category) => {
      if (activeCategory === category) {
        // Stop timer
        const now = Date.now()
        const duration = now - startTime!
        const task: TaskRecord = {
          id: crypto.randomUUID(),
          category,
          startTime: new Date(startTime!).toISOString(),
          endTime: new Date(now).toISOString(),
          duration
        }

        await window.api.saveTask(task)
        setTodayTasks((prev) => [...prev, task])
        setActiveCategory(null)
        setStartTime(null)
      } else if (activeCategory === null) {
        // Start timer
        setActiveCategory(category)
        setStartTime(Date.now())
      } else {
        // Switch: stop current, start new
        const now = Date.now()
        const duration = now - startTime!
        const task: TaskRecord = {
          id: crypto.randomUUID(),
          category: activeCategory,
          startTime: new Date(startTime!).toISOString(),
          endTime: new Date(now).toISOString(),
          duration
        }

        await window.api.saveTask(task)
        setTodayTasks((prev) => [...prev, task])
        setActiveCategory(category)
        setStartTime(Date.now())
      }
    },
    [activeCategory, startTime]
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
          <ThemeToggle />
        </div>

        <TimerDisplay
          activeCategory={activeCategory}
          formattedTime={formatTime(elapsed)}
        />
        <CategoryGrid
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        <TaskHistory tasks={todayTasks} formatTime={formatTime} />
      </div>
    </div>
  )
}
