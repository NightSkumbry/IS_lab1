import type { Address, AddressInput } from '@/entities/address/@x/organization'

export const ORGANIZATION_TYPES = ['COMMERCIAL', 'PUBLIC', 'PRIVATE_LIMITED_COMPANY'] as const
export type OrganizationType = (typeof ORGANIZATION_TYPES)[number]

export interface Organization {
  id: number
  name: string
  officialAddress: Address
  annualTurnover: number
  employeesCount: number
  rating: number
  type: OrganizationType | null
  postalAddress: Address
}

export interface OrganizationInput {
  name: string
  officialAddress: AddressInput
  annualTurnover: number
  employeesCount: number
  rating: number
  type: OrganizationType | null
  postalAddress: AddressInput
}

export interface OrganizationFilters {
  name?: string
  type?: OrganizationType
}

export interface OrganizationSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface OrganizationsQuery {
  page: number
  size: number
  sort?: OrganizationSort
  filters?: OrganizationFilters
}
