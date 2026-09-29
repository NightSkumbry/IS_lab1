import { z } from 'zod'
import { addressFormSchema, emptyAddressFormValues } from '@/entities/address/@x/organization'

export const organizationSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым'),
  officialAddress: addressFormSchema,
  annualTurnover: z
    .number({ error: 'Введите число' })
    .int('Значение должно быть целым')
    .positive('Годовой оборот должен быть больше 0'),
  employeesCount: z
    .number({ error: 'Введите число' })
    .int('Значение должно быть целым')
    .positive('Количество сотрудников должно быть больше 0'),
  rating: z.number({ error: 'Введите число' }).positive('Рейтинг должен быть больше 0'),
  type: z.string(),
  postalAddress: addressFormSchema,
})

export type OrganizationFormValues = z.infer<typeof organizationSchema>

export const emptyOrganizationFormValues: OrganizationFormValues = {
  name: '',
  officialAddress: emptyAddressFormValues,
  annualTurnover: '' as unknown as number,
  employeesCount: '' as unknown as number,
  rating: '' as unknown as number,
  type: '',
  postalAddress: emptyAddressFormValues,
}
