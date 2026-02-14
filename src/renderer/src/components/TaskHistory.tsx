import { ListChecks } from 'lucide-react'
import { TaskRecord, Category, CATEGORY_ICONS, CATEGORY_ACCENT_VAR } from '../types'

interface Props {
  tasks: TaskRecord[]
  formatTime: (ms: number) => string
}

export default function TaskHistory({ tasks, formatTime }: Props) {
  const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0)

  return (
    <div className="px-4 mt-6 pb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <ListChecks size={16} className="text-text-secondary" />
          <h2 className="text-sm font-semibold text-text-primary">今日のタスク</h2>
        </div>
        <span className="text-xs font-mono text-text-tertiary">
          合計: {formatTime(totalDuration)}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-text-tertiary py-8 text-sm">
          まだタスクがありません
        </div>
      ) : (
        <div className="space-y-2">
          {[...tasks].reverse().map((task, index) => {
            const Icon = CATEGORY_ICONS[task.category as Category]
            const accent = CATEGORY_ACCENT_VAR[task.category as Category]

            return (
              <div
                key={task.id}
                className="flex items-center justify-between bg-surface-secondary rounded-xl px-4 py-3 shadow-card animate-slide-up"
                style={{
                  borderLeft: `3px solid ${accent}`,
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} style={{ color: accent }} />
                  <span className="text-sm font-medium text-text-primary">{task.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-text-primary">
                    {formatTime(task.duration)}
                  </div>
                  <div className="text-[11px] text-text-tertiary">
                    {new Date(task.startTime).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {' - '}
                    {new Date(task.endTime).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
