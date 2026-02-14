import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'system' | 'light' | 'dark'

const THEME_OPTIONS: { value: Theme; Icon: typeof Sun }[] = [
  { value: 'system', Icon: Monitor },
  { value: 'light', Icon: Sun },
  { value: 'dark', Icon: Moon }
]

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  if (theme !== 'system') {
    root.classList.add(theme)
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const cycle = () => {
    const idx = THEME_OPTIONS.findIndex((o) => o.value === theme)
    const next = THEME_OPTIONS[(idx + 1) % THEME_OPTIONS.length]
    setTheme(next.value)
  }

  const current = THEME_OPTIONS.find((o) => o.value === theme)!

  return (
    <button
      onClick={cycle}
      className="p-1.5 rounded-lg bg-surface-secondary hover:bg-surface-hover transition-colors duration-200 cursor-pointer"
      title={`Theme: ${theme}`}
    >
      <current.Icon size={16} className="text-text-secondary" />
    </button>
  )
}
