import type { Location } from '@/entities/location/@x/address'

export interface Address {
  id: number
  zipCode: string | null
  town: Location | null
}

export interface AddressInput {
  zipCode: string | null
  town: { x: number; y: number; name: string | null } | null
}
