import { formValuesToPersonInput, useCreatePersonMutation } from '@/entities/person'
import { PersonForm } from '@/features/person-form'

interface Props {
  onSuccess: () => void
  onCancel: () => void
}

export function CreatePersonForm({ onSuccess, onCancel }: Props) {
  const [createPerson] = useCreatePersonMutation()

  return (
    <PersonForm
      submitLabel="Создать"
      onCancel={onCancel}
      onSubmit={async (values) => {
        await createPerson(formValuesToPersonInput(values)).unwrap()
        onSuccess()
      }}
    />
  )
}
