import { locationFormValuesToInput, locationToFormValues } from '@/entities/location/@x/person'
import type { PersonFormValues } from './schema'
import type { Color, Person, PersonInput } from './types'

export function personToFormValues(person: Person): PersonFormValues {
  return {
    name: person.name,
    eyeColor: person.eyeColor ?? '',
    hairColor: person.hairColor,
    location: locationToFormValues(person.location),
    weight: person.weight,
    nationality: person.nationality,
  }
}

export function formValuesToPersonInput(values: PersonFormValues): PersonInput {
  return {
    name: values.name.trim(),
    eyeColor: (values.eyeColor || null) as Color | null,
    hairColor: values.hairColor,
    location: locationFormValuesToInput(values.location),
    weight: values.weight,
    nationality: values.nationality,
  }
}
