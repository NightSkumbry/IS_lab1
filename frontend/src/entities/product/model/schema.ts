import { z } from 'zod'
import { UNITS_OF_MEASURE } from './types'

const SELECT_REQUIRED = 'Выберите значение из списка'

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым'),
  coordinates: z.object({
    x: z
      .number({ error: 'Введите число' })
      .int('Значение должно быть целым')
      .gt(-220, 'Значение должно быть больше -220'),
    y: z.number({ error: 'Введите число' }),
  }),
  unitOfMeasure: z.enum(UNITS_OF_MEASURE, { error: 'Выберите единицу измерения' }),
  manufacturerId: z.number({ error: SELECT_REQUIRED }).int().positive(SELECT_REQUIRED),
  price: z.number({ error: 'Введите число' }).positive('Цена должна быть больше 0'),
  manufactureCost: z.number({ error: 'Введите число' }).nullable(),
  rating: z.number({ error: 'Введите число' }).positive('Рейтинг должен быть больше 0'),
  partNumber: z
    .string()
    .trim()
    .min(1, 'Партийный номер не может быть пустым')
    .min(28, 'Партийный номер должен содержать не менее 28 символов')
    .max(84, 'Партийный номер должен содержать не более 84 символов'),
  ownerId: z.number({ error: SELECT_REQUIRED }).int().positive(SELECT_REQUIRED),
})

export type ProductFormValues = z.infer<typeof productSchema>
