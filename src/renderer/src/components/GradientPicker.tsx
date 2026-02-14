import { GRADIENT_PRESETS } from '../constants/gradients'

interface Props {
  selectedFrom: string
  onSelect: (preset: { gradientFrom: string; gradientTo: string; accent: string }) => void
}

export default function GradientPicker({ selectedFrom, onSelect }: Props) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {GRADIENT_PRESETS.map((preset, i) => {
        const isSelected = selectedFrom === preset.gradientFrom
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(preset)}
            className={`
              h-10 rounded-lg cursor-pointer transition-all duration-150
              ${isSelected ? 'ring-2 ring-text-primary/40 ring-offset-2 ring-offset-surface scale-105' : 'hover:scale-105'}
            `}
            style={{
              background: `linear-gradient(to bottom right, ${preset.gradientFrom}, ${preset.gradientTo})`
            }}
          />
        )
      })}
    </div>
  )
}
