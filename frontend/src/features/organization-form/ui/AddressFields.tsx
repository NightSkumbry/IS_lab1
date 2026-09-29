import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { OrganizationFormValues } from '@/entities/organization'
import { FormField, Input } from '@/shared/ui'
import styles from './OrganizationForm.module.css'

interface Props {
  prefix: 'officialAddress' | 'postalAddress'
  title: string
  register: UseFormRegister<OrganizationFormValues>
  errors: FieldErrors<OrganizationFormValues>
}

export function AddressFields({ prefix, title, register, errors }: Props) {
  const addressErrors = errors[prefix]

  return (
    <fieldset className={styles.fieldset}>
      <legend>{title}</legend>

      <FormField label="Индекс" error={addressErrors?.zipCode?.message}>
        <Input
          placeholder="необязательно, от 6 символов"
          invalid={!!addressErrors?.zipCode}
          {...register(`${prefix}.zipCode`)}
        />
      </FormField>

      <div className={styles.row}>
        <FormField label="Населённый пункт: X" error={addressErrors?.town?.x?.message}>
          <Input
            type="number"
            placeholder="необязательно"
            invalid={!!addressErrors?.town?.x}
            {...register(`${prefix}.town.x`, { valueAsNumber: true })}
          />
        </FormField>
        <FormField label="Населённый пункт: Y" error={addressErrors?.town?.y?.message}>
          <Input
            type="number"
            placeholder="необязательно"
            invalid={!!addressErrors?.town?.y}
            {...register(`${prefix}.town.y`, { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <FormField label="Название населённого пункта" error={addressErrors?.town?.name?.message}>
        <Input placeholder="необязательно" {...register(`${prefix}.town.name`)} />
      </FormField>
    </fieldset>
  )
}
