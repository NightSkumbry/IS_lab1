import type { Organization } from '@/entities/organization/@x/product'
import type { Person } from '@/entities/person/@x/product'

export const UNITS_OF_MEASURE = [
  'KILOGRAMS',
  'CENTIMETERS',
  'SQUARE_METERS',
  'MILLILITERS',
  'GRAMS',
] as const
export type UnitOfMeasure = (typeof UNITS_OF_MEASURE)[number]

export interface Coordinates {
  x: number
  y: number
}

export interface Product {
  id: number
  name: string
  coordinates: Coordinates
  creationDate: string
  unitOfMeasure: UnitOfMeasure
  manufacturer: Organization
  price: number
  manufactureCost: number | null
  rating: number
  partNumber: string
  owner: Person
}

export interface ProductFilters {
  name?: string
  unitOfMeasure?: UnitOfMeasure
  manufacturerName?: string
  partNumber?: string
  ownerName?: string
}

export interface ProductSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface ProductsQuery {
  page: number
  size: number
  sort?: ProductSort
  filters?: ProductFilters
}

export interface ProductInput {
  name: string
  coordinates: Coordinates
  unitOfMeasure: UnitOfMeasure
  manufacturerId: number
  price: number
  manufactureCost: number | null
  rating: number
  partNumber: string
  ownerId: number
}

export interface RatingGroup {
  rating: number
  count: number
}

export interface ReducePriceInput {
  percent: number
}

export interface ReducePriceResult {
  message: string
}
