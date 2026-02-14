import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { CategoryConfig } from '../types'
import { GRADIENT_PRESETS } from '../constants/gradients'
import IconPicker from './IconPicker'
import GradientPicker from './GradientPicker'

interface Props {
  initial?: CategoryConfig
  onSave: (data: { name: string; icon: string; gradientFrom: string; gradientTo: string; accent: string }) => void
  onCancel: () => void
}

export default function CategoryForm({ initial, onSave, onCancel }: Props) {
  const defaultPreset = GRADIENT_PRESETS[0]
  const [name, setName] = useState(initial?.name || '')
  const [icon, setIcon] = useState(initial?.icon || 'Star')
  const [gradientFrom, setGradientFrom] = useState(initial?.gradientFrom || defaultPreset.gradientFrom)
  const [gradientTo, setGradientTo] = useState(initial?.gradientTo || defaultPreset.gradientTo)
  const [accent, setAccent] = useState(initial?.accent || defaultPreset.accent)

  const canSave = name.trim().length > 0

  const handleSubmit = () => {
    if (!canSave) return
    onSave({ name: name.trim(), icon, gradientFrom, gradientTo, accent })
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={onCancel}
          className="p-1 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} className="text-text-secondary" />
        </button>
        <h3 className="text-sm font-semibold text-text-primary">
          {initial ? 'カテゴリを編集' : 'カテゴリを追加'}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            placeholder="カテゴリ名を入力"
            className="w-full px-3 py-2 rounded-lg bg-surface-secondary text-text-primary text-sm
              border border-transparent focus:border-text-tertiary focus:outline-none
              transition-colors placeholder:text-text-tertiary"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">アイコン</label>
          <IconPicker selected={icon} onSelect={setIcon} />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">カラー</label>
          <GradientPicker
            selectedFrom={gradientFrom}
            onSelect={(preset) => {
              setGradientFrom(preset.gradientFrom)
              setGradientTo(preset.gradientTo)
              setAccent(preset.accent)
            }}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!canSave}
            className={`
              flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
              ${canSave
                ? 'bg-text-primary text-surface hover:opacity-90'
                : 'bg-surface-hover text-text-tertiary cursor-not-allowed'
              }
            `}
          >
            保存
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-surface-secondary text-text-secondary
              hover:bg-surface-hover transition-colors cursor-pointer"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}
