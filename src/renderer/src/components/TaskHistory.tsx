import { TaskRecord, Category, CATEGORY_EMOJIS } from '../types'

interface Props {
  tasks: TaskRecord[]
  formatTime: (ms: number) => string
}

export default function TaskHistory({ tasks, formatTime }: Props) {
  const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0)

  return (
    <div className="px-4 mt-6 pb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-700">今日のタスク</h2>
        <span className="text-sm text-gray-500">
          合計: {formatTime(totalDuration)}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 py-8 text-sm">
          まだタスクがありません
        </div>
      ) : (
        <div className="space-y-2">
          {[...tasks].reverse().map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span>{CATEGORY_EMOJIS[task.category as Category]}</span>
                <span className="text-sm font-medium text-gray-700">{task.category}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-gray-800">
                  {formatTime(task.duration)}
                </div>
                <div className="text-xs text-gray-400">
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
          ))}
        </div>
      )}
    </div>
  )
}
