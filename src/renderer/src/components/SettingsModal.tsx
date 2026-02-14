import { useState, useRef } from 'react'
import { X, GripVertical, Pencil, Trash2, Plus } from 'lucide-react'
import { CategoryConfig } from '../types'
import { ICON_MAP } from '../constants/icons'
import CategoryForm from './CategoryForm'

interface Props {
  categories: CategoryConfig[]
  activeCategoryId: string | null
  onSave: (categories: CategoryConfig[]) => void
  onClose: () => void
}

const MAX_CATEGORIES = 12

type View = 'list' | 'add' | 'edit'

export default function SettingsModal({ categories, activeCategoryId, onSave, onClose }: Props) {
  const [view, setView] = useState<View>('list')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [localCategories, setLocalCategories] = useState<CategoryConfig[]>(
    [...categories].sort((a, b) => a.order - b.order)
  )
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const editingCategory = editingId ? localCategories.find((c) => c.id === editingId) : undefined

  const persistCategories = (updated: CategoryConfig[]) => {
    const reordered = updated.map((c, i) => ({ ...c, order: i }))
    setLocalCategories(reordered)
    onSave(reordered)
  }

  const handleDragStart = (index: number) => {
    dragItem.current = index
  }

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index
  }

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return
    if (dragItem.current === dragOverItem.current) {
      dragItem.current = null
      dragOverItem.current = null
      return
    }

    const items = [...localCategories]
    const dragged = items.splice(dragItem.current, 1)[0]
    items.splice(dragOverItem.current, 0, dragged)

    dragItem.current = null
    dragOverItem.current = null

    persistCategories(items)
  }

  const handleAdd = (data: {
    name: string
    icon: string
    gradientFrom: string
    gradientTo: string
    accent: string
  }) => {
    const newCat: CategoryConfig = {
      id: crypto.randomUUID(),
      name: data.name,
      icon: data.icon,
      gradientFrom: data.gradientFrom,
      gradientTo: data.gradientTo,
      accent: data.accent,
      order: localCategories.length
    }
    persistCategories([...localCategories, newCat])
    setView('list')
  }

  const handleEdit = (data: {
    name: string
    icon: string
    gradientFrom: string
    gradientTo: string
    accent: string
  }) => {
    if (!editingId) return
    const updated = localCategories.map((c) =>
      c.id === editingId ? { ...c, ...data } : c
    )
    persistCategories(updated)
    setEditingId(null)
    setView('list')
  }

  const handleDelete = (id: string) => {
    if (id === activeCategoryId) {
      alert('タイマーを停止してから削除してください')
      return
    }
    const updated = localCategories.filter((c) => c.id !== id)
    persistCategories(updated)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && view === 'list') onClose()
      }}
    >
      <div
        className="bg-surface rounded-2xl shadow-button-hover w-[360px] max-h-[520px] flex flex-col animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {view === 'list' ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-hover">
              <h2 className="text-sm font-semibold text-text-primary">カテゴリ設定</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <X size={18} className="text-text-secondary" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {localCategories.map((cat, index) => {
                const Icon = ICON_MAP[cat.icon]
                return (
                  <div
                    key={cat.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex items-center gap-2 px-2 py-2.5 rounded-xl hover:bg-surface-secondary transition-colors group
                      cursor-grab active:cursor-grabbing active:opacity-50"
                  >
                    <GripVertical size={16} className="text-text-tertiary shrink-0" />
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `linear-gradient(to bottom right, ${cat.gradientFrom}, ${cat.gradientTo})`
                      }}
                    >
                      {Icon && <Icon size={14} className="text-white" />}
                    </div>
                    <span className="text-sm text-text-primary flex-1 truncate">{cat.name}</span>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingId(cat.id)
                          setView('edit')
                        }}
                        className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
                      >
                        <Pencil size={14} className="text-text-tertiary" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        disabled={localCategories.length <= 1}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer
                          ${localCategories.length <= 1
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-surface-hover'
                          }`}
                      >
                        <Trash2 size={14} className="text-text-tertiary" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Add button */}
            <div className="px-4 py-3 border-t border-surface-hover">
              <button
                onClick={() => setView('add')}
                disabled={localCategories.length >= MAX_CATEGORIES}
                className={`
                  w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5
                  transition-colors cursor-pointer
                  ${localCategories.length >= MAX_CATEGORIES
                    ? 'bg-surface-secondary text-text-tertiary cursor-not-allowed'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-hover'
                  }
                `}
              >
                <Plus size={16} />
                カテゴリを追加
              </button>
            </div>
          </>
        ) : view === 'add' ? (
          <div className="p-5">
            <CategoryForm onSave={handleAdd} onCancel={() => setView('list')} />
          </div>
        ) : (
          <div className="p-5">
            <CategoryForm
              initial={editingCategory}
              onSave={handleEdit}
              onCancel={() => {
                setEditingId(null)
                setView('list')
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
