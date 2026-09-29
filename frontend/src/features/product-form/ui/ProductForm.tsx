import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { OrganizationPicker } from '@/entities/organization'
import {
  emptyProductFormValues,
  productSchema,
  UNITS_OF_MEASURE,
  type ProductFormValues,
} from '@/entities/product'
import { PersonPicker } from '@/entities/person'
import { getErrorMessage } from '@/shared/api'
import { applyServerErrors } from '@/shared/lib'
import { Button, FormField, Input, Select } from '@/shared/ui'
import styles from './ProductForm.module.css'

interface Props {
  defaultValues?: ProductFormValues
  submitLabel: string
  onSubmit: (values: ProductFormValues) => Promise<unknown>
  onCancel: () => void
}

export function ProductForm({ defaultValues, submitLabel, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: emptyProductFormValues,
    values: defaultValues,
  })

  const manufacturerField = useController({ control, name: 'manufacturerId' }).field
  const ownerField = useController({ control, name: 'ownerId' }).field

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
        <FormField label="Координата X" error={errors.coordinates?.x?.message}>
          <Input
            type="number"
            invalid={!!errors.coordinates?.x}
            {...register('coordinates.x', { valueAsNumber: true })}
          />
        </FormField>
        <FormField label="Координата Y" error={errors.coordinates?.y?.message}>
          <Input
            type="number"
            step="any"
            invalid={!!errors.coordinates?.y}
            {...register('coordinates.y', { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <FormField label="Единица измерения" error={errors.unitOfMeasure?.message}>
        <Select invalid={!!errors.unitOfMeasure} {...register('unitOfMeasure')}>
          <option value="">Выберите единицу измерения</option>
          {UNITS_OF_MEASURE.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Производитель" error={errors.manufacturerId?.message}>
        <OrganizationPicker invalid={!!errors.manufacturerId} {...manufacturerField} />
      </FormField>

      <div className={styles.row}>
        <FormField label="Цена" error={errors.price?.message}>
          <Input
            type="number"
            step="any"
            invalid={!!errors.price}
            {...register('price', { valueAsNumber: true })}
          />
        </FormField>
        <FormField label="Себестоимость" error={errors.manufactureCost?.message}>
          <Input
            type="number"
            step="any"
            placeholder="необязательно"
            invalid={!!errors.manufactureCost}
            {...register('manufactureCost', {
              setValueAs: (value: unknown) => (value === '' || value == null ? null : Number(value)),
            })}
          />
        </FormField>
      </div>

      <FormField label="Рейтинг" error={errors.rating?.message}>
        <Input
          type="number"
          step="any"
          invalid={!!errors.rating}
          {...register('rating', { valueAsNumber: true })}
        />
      </FormField>

      <FormField label="Партийный номер (28–84 символа)" error={errors.partNumber?.message}>
        <Input invalid={!!errors.partNumber} {...register('partNumber')} />
      </FormField>

      <FormField label="Владелец" error={errors.ownerId?.message}>
        <PersonPicker invalid={!!errors.ownerId} {...ownerField} />
      </FormField>

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
