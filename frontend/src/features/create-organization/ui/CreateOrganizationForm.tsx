import { formValuesToOrganizationInput, useCreateOrganizationMutation } from '@/entities/organization'
import { OrganizationForm } from '@/features/organization-form'

interface Props {
  onSuccess: () => void
  onCancel: () => void
}

export function CreateOrganizationForm({ onSuccess, onCancel }: Props) {
  const [createOrganization] = useCreateOrganizationMutation()

  return (
    <OrganizationForm
      submitLabel="Создать"
      onCancel={onCancel}
      onSubmit={async (values) => {
        await createOrganization(formValuesToOrganizationInput(values)).unwrap()
        onSuccess()
      }}
    />
  )
}
