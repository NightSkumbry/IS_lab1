import type { ComponentPropsWithRef } from 'react'
import { Select } from '@/shared/ui'
import { useGetOrganizationsQuery } from '../api/organizationApi'

interface Props extends Omit<ComponentPropsWithRef<'select'>, 'value' | 'onChange'> {
  value: number | ''
  onChange: (value: number | '') => void
  invalid?: boolean
}

export function OrganizationPicker({ value, onChange, invalid, ...rest }: Props) {
  const { data, isLoading, isError } = useGetOrganizationsQuery({ page: 0, size: 100 })

  return (
    <Select
      invalid={invalid}
      disabled={isLoading || isError}
      value={value}
      onChange={(event) => onChange(event.target.value === '' ? '' : Number(event.target.value))}
      {...rest}
    >
      <option value="">
        {isLoading ? 'Загрузка…' : isError ? 'Не удалось загрузить список' : 'Выберите производителя'}
      </option>
      {data?.content.map((organization) => (
        <option key={organization.id} value={organization.id}>
          {organization.name} (#{organization.id})
        </option>
      ))}
    </Select>
  )
}
