import { addressFormValuesToInput, addressToFormValues } from '@/entities/address/@x/organization'
import type { OrganizationFormValues } from './schema'
import type { Organization, OrganizationInput, OrganizationType } from './types'

export function organizationToFormValues(organization: Organization): OrganizationFormValues {
  return {
    name: organization.name,
    officialAddress: addressToFormValues(organization.officialAddress),
    annualTurnover: organization.annualTurnover,
    employeesCount: organization.employeesCount,
    rating: organization.rating,
    type: organization.type ?? '',
    postalAddress: addressToFormValues(organization.postalAddress),
  }
}

export function formValuesToOrganizationInput(values: OrganizationFormValues): OrganizationInput {
  return {
    name: values.name.trim(),
    officialAddress: addressFormValuesToInput(values.officialAddress),
    annualTurnover: values.annualTurnover,
    employeesCount: values.employeesCount,
    rating: values.rating,
    type: (values.type || null) as OrganizationType | null,
    postalAddress: addressFormValuesToInput(values.postalAddress),
  }
}
