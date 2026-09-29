import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  emptyOrganizationFormValues,
  ORGANIZATION_TYPES,
  organizationSchema,
  type OrganizationFormValues,
} from '@/entities/organization'
import { getErrorMessage } from '@/shared/api'
import { applyServerErrors } from '@/shared/lib'
import { Button, FormField, Input, Select } from '@/shared/ui'
import { AddressFields } from './AddressFields'
import styles from './OrganizationForm.module.css'

interface Props {
  defaultValues?: OrganizationFormValues
  submitLabel: string
  onSubmit: (values: OrganizationFormValues) => Promise<unknown>
  onCancel: () => void
}

export function OrganizationForm({ defaultValues, submitLabel, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: emptyOrganizationFormValues,
    values: defaultValues,
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      if (!applyServerErrors(error, setError)) {
        setError('root.server', { message: getErrorMessage(error) })
      }
    }
  })

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <FormField label="Название" error={errors.name?.message}>
        <Input invalid={!!errors.name} {...register('name')} />
      </FormField>

      <div className={styles.row}>
        <FormField label="Годовой оборот" error={errors.annualTurnover?.message}>
          <Input
            type="number"
            invalid={!!errors.annualTurnover}
            {...register('annualTurnover', { valueAsNumber: true })}
          />
        </FormField>
        <FormField label="Сотрудников" error={errors.employeesCount?.message}>
          <Input
            type="number"
            invalid={!!errors.employeesCount}
            {...register('employeesCount', { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <div className={styles.row}>
        <FormField label="Рейтинг" error={errors.rating?.message}>
          <Input
            type="number"
            step="any"
            invalid={!!errors.rating}
            {...register('rating', { valueAsNumber: true })}
          />
        </FormField>
        <FormField label="Тип" error={errors.type?.message}>
          <Select invalid={!!errors.type} {...register('type')}>
            <option value="">Не указан</option>
            {ORGANIZATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <AddressFields prefix="officialAddress" title="Официальный адрес" register={register} errors={errors} />
      <AddressFields prefix="postalAddress" title="Почтовый адрес" register={register} errors={errors} />

      {errors.root?.server && (
        <p className={styles.rootError} role="alert">
          {errors.root.server.message}
        </p>
      )}

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
