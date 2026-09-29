import type { Location } from '@/entities/location/@x/person'

export const COLORS = ['RED', 'YELLOW', 'ORANGE', 'WHITE', 'BROWN'] as const
export type Color = (typeof COLORS)[number]

export const COUNTRIES = ['RUSSIA', 'FRANCE', 'SPAIN', 'THAILAND', 'JAPAN'] as const
export type Country = (typeof COUNTRIES)[number]

export interface Person {
  id: number
  name: string
  eyeColor: Color | null
  hairColor: Color
  location: Location | null
  weight: number | null
  nationality: Country
}

export interface PersonInput {
  name: string
  eyeColor: Color | null
  hairColor: Color
  location: { x: number; y: number; name: string | null } | null
  weight: number | null
  nationality: Country
}

export interface PersonFilters {
  name?: string
  eyeColor?: Color
  hairColor?: Color
  nationality?: Country
}

export interface PersonSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface PersonsQuery {
  page: number
  size: number
  sort?: PersonSort
  filters?: PersonFilters
}
