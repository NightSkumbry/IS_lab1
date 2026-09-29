import { formValuesToPersonInput, personToFormValues, useUpdatePersonMutation, type Person } from '@/entities/person'
import { PersonForm } from '@/features/person-form'

interface Props {
  person: Person
  onSuccess: () => void
  onCancel: () => void
}

export function EditPersonForm({ person, onSuccess, onCancel }: Props) {
  const [updatePerson] = useUpdatePersonMutation()

  return (
    <PersonForm
      submitLabel="Сохранить"
      defaultValues={personToFormValues(person)}
      onCancel={onCancel}
      onSubmit={async (values) => {
        await updatePerson({ id: person.id, data: formValuesToPersonInput(values) }).unwrap()
        onSuccess()
      }}
    />
  )
}
