import { useState } from 'react'
import { Input } from '../Input'

export type FilterKind = { kind: 'text' }

interface Props {
  filter: FilterKind
  title: string
  value: string
  onChange: (value: string) => void
}

export function FilterCell({ title, value, onChange }: Props) {
  const [draft, setDraft] = useState(value)
  const [prevValue, setPrevValue] = useState(value)

  if (value !== prevValue) {
    setPrevValue(value)
    setDraft(value)
  }

  const commit = () => {
    if (draft !== value) onChange(draft)
  }

  return (
    <Input
      aria-label={`Фильтр: ${title}`}
      placeholder="Введите точное значение"
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') commit()
      }}
    />
  )
}
