import { z } from 'zod'
import {
  checkLocationGroup,
  emptyLocationFormValues,
  locationFormValuesToInput,
  locationGroupSchema,
  locationToFormValues,
} from '@/entities/location/@x/address'
import type { Address, AddressInput } from './types'

export const addressFormSchema = z
  .object({
    zipCode: z.string(),
    town: locationGroupSchema,
  })
  .superRefine((address, ctx) => {
    const zip = address.zipCode.trim()
    if (zip && zip.length < 6) {
      ctx.addIssue({ code: 'custom', path: ['zipCode'], message: 'Индекс должен содержать не менее 6 символов' })
    }
    checkLocationGroup(address.town, ctx, ['town'])
  })

export type AddressFormValues = z.infer<typeof addressFormSchema>

export const emptyAddressFormValues: AddressFormValues = {
  zipCode: '',
  town: emptyLocationFormValues,
}

export function addressFormValuesToInput(address: AddressFormValues): AddressInput {
  return {
    zipCode: address.zipCode.trim() || null,
    town: locationFormValuesToInput(address.town),
  }
}

export function addressToFormValues(address: Address): AddressFormValues {
  return {
    zipCode: address.zipCode ?? '',
    town: locationToFormValues(address.town),
  }
}
