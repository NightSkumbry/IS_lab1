import { z } from 'zod'
import type { Location } from './types'

const numberOrEmpty = z.custom<number>((value) => typeof value === 'number', 'Введите число')

export const locationGroupSchema = z.object({
  x: numberOrEmpty,
  y: numberOrEmpty,
  name: z.string(),
})

export type LocationFormValues = z.infer<typeof locationGroupSchema>

export const emptyLocationFormValues: LocationFormValues = { x: NaN, y: NaN, name: '' }

function isFilled({ x, y, name }: LocationFormValues): boolean {
  return !Number.isNaN(x) || !Number.isNaN(y) || !!name.trim()
}

export function checkLocationGroup(
  location: LocationFormValues,
  ctx: z.RefinementCtx,
  path: (string | number)[],
) {
  if (!isFilled(location)) return
  if (Number.isNaN(location.x)) {
    ctx.addIssue({ code: 'custom', path: [...path, 'x'], message: 'Введите число' })
  }
  if (Number.isNaN(location.y)) {
    ctx.addIssue({ code: 'custom', path: [...path, 'y'], message: 'Введите число' })
  }
}

export function locationFormValuesToInput(
  location: LocationFormValues,
): { x: number; y: number; name: string | null } | null {
  if (!isFilled(location)) return null
  return { x: location.x, y: location.y, name: location.name.trim() || null }
}

export function locationToFormValues(location: Location | null): LocationFormValues {
  if (!location) return emptyLocationFormValues
  return { x: location.x, y: location.y, name: location.name ?? '' }
}
