import type { ComponentPropsWithRef } from 'react'
import { Select } from '@/shared/ui'
import { useGetPersonsQuery } from '../api/personApi'

interface Props extends Omit<ComponentPropsWithRef<'select'>, 'value' | 'onChange'> {
  value: number | ''
  onChange: (value: number | '') => void
  invalid?: boolean
}

export function PersonPicker({ value, onChange, invalid, ...rest }: Props) {
  const { data, isLoading, isError } = useGetPersonsQuery({ page: 0, size: 100 })

  return (
    <Select
      invalid={invalid}
      disabled={isLoading || isError}
      value={value}
      onChange={(event) => onChange(event.target.value === '' ? '' : Number(event.target.value))}
      {...rest}
    >
      <option value="">
        {isLoading ? 'Загрузка…' : isError ? 'Не удалось загрузить список' : 'Выберите владельца'}
      </option>
      {data?.content.map((person) => (
        <option key={person.id} value={person.id}>
          {person.name} (#{person.id})
        </option>
      ))}
    </Select>
  )
}
