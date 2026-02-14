import { ICON_MAP, ICON_KEYS } from '../constants/icons'

interface Props {
  selected: string
  onSelect: (iconKey: string) => void
}

export default function IconPicker({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {ICON_KEYS.map((key) => {
        const Icon = ICON_MAP[key]
        const isSelected = selected === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`
              p-2.5 rounded-lg flex items-center justify-center cursor-pointer
              transition-all duration-150
              ${
                isSelected
                  ? 'bg-text-primary/10 ring-2 ring-text-primary/30'
                  : 'bg-surface-secondary hover:bg-surface-hover'
              }
            `}
          >
            <Icon size={20} className="text-text-primary" />
          </button>
        )
      })}
    </div>
  )
}
