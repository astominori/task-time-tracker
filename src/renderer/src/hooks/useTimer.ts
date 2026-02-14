import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(isRunning: boolean, startTime: number | null) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning && startTime !== null) {
      const tick = () => setElapsed(Date.now() - startTime)
      tick()
      intervalRef.current = setInterval(tick, 200)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    } else {
      setElapsed(0)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, startTime])

  const formatTime = useCallback((ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000)
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [])

  return { elapsed, formatTime }
}
