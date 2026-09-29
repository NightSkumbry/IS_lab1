import {
  formValuesToOrganizationInput,
  organizationToFormValues,
  useUpdateOrganizationMutation,
  type Organization,
} from '@/entities/organization'
import { OrganizationForm } from '@/features/organization-form'

interface Props {
  organization: Organization
  onSuccess: () => void
  onCancel: () => void
}

export function EditOrganizationForm({ organization, onSuccess, onCancel }: Props) {
  const [updateOrganization] = useUpdateOrganizationMutation()

  return (
    <OrganizationForm
      submitLabel="Сохранить"
      defaultValues={organizationToFormValues(organization)}
      onCancel={onCancel}
      onSubmit={async (values) => {
        await updateOrganization({
          id: organization.id,
          data: formValuesToOrganizationInput(values),
        }).unwrap()
        onSuccess()
      }}
    />
  )
}
