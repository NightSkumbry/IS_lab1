import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { COLORS, COUNTRIES, emptyPersonFormValues, personSchema, type PersonFormValues } from '@/entities/person'
import { getErrorMessage } from '@/shared/api'
import { applyServerErrors } from '@/shared/lib'
import { Button, FormField, Input, Select } from '@/shared/ui'
import styles from './PersonForm.module.css'

interface Props {
  defaultValues?: PersonFormValues
  submitLabel: string
  onSubmit: (values: PersonFormValues) => Promise<unknown>
  onCancel: () => void
}

export function PersonForm({ defaultValues, submitLabel, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: emptyPersonFormValues,
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
      <FormField label="Имя" error={errors.name?.message}>
        <Input invalid={!!errors.name} {...register('name')} />
      </FormField>

      <div className={styles.row}>
        <FormField label="Цвет глаз" error={errors.eyeColor?.message}>
          <Select invalid={!!errors.eyeColor} {...register('eyeColor')}>
            <option value="">Не указан</option>
            {COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Цвет волос" error={errors.hairColor?.message}>
          <Select invalid={!!errors.hairColor} {...register('hairColor')}>
            <option value="">Выберите цвет волос</option>
            {COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className={styles.row}>
        <FormField label="Вес" error={errors.weight?.message}>
          <Input
            type="number"
            placeholder="необязательно"
            invalid={!!errors.weight}
            {...register('weight', {
              setValueAs: (value: unknown) => (value === '' || value == null ? null : Number(value)),
            })}
          />
        </FormField>
        <FormField label="Национальность" error={errors.nationality?.message}>
          <Select invalid={!!errors.nationality} {...register('nationality')}>
            <option value="">Выберите национальность</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Местоположение</legend>
        <div className={styles.row}>
          <FormField label="X" error={errors.location?.x?.message}>
            <Input
              type="number"
              placeholder="необязательно"
              invalid={!!errors.location?.x}
              {...register('location.x', { valueAsNumber: true })}
            />
          </FormField>
          <FormField label="Y" error={errors.location?.y?.message}>
            <Input
              type="number"
              placeholder="необязательно"
              invalid={!!errors.location?.y}
              {...register('location.y', { valueAsNumber: true })}
            />
          </FormField>
        </div>
        <FormField label="Название" error={errors.location?.name?.message}>
          <Input placeholder="необязательно" {...register('location.name')} />
        </FormField>
      </fieldset>

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
