import type { ProductFormValues } from './schema'
import type { Product, ProductInput } from './types'

export const emptyProductFormValues = {
  name: '',
  coordinates: { x: '' as unknown as number, y: '' as unknown as number },
  unitOfMeasure: '' as unknown as ProductFormValues['unitOfMeasure'],
  manufacturerId: '' as unknown as number,
  price: '' as unknown as number,
  manufactureCost: null,
  rating: '' as unknown as number,
  partNumber: '',
  ownerId: '' as unknown as number,
} satisfies ProductFormValues

export function productToFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    coordinates: { x: product.coordinates.x, y: product.coordinates.y },
    unitOfMeasure: product.unitOfMeasure,
    manufacturerId: product.manufacturer.id,
    price: product.price,
    manufactureCost: product.manufactureCost,
    rating: product.rating,
    partNumber: product.partNumber,
    ownerId: product.owner.id,
  }
}

export function formValuesToInput(values: ProductFormValues): ProductInput {
  return {
    name: values.name.trim(),
    coordinates: values.coordinates,
    unitOfMeasure: values.unitOfMeasure,
    manufacturerId: values.manufacturerId,
    price: values.price,
    manufactureCost: values.manufactureCost,
    rating: values.rating,
    partNumber: values.partNumber.trim(),
    ownerId: values.ownerId,
  }
}
