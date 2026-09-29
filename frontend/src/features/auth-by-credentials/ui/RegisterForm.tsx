import { useRegisterMutation } from '@/entities/user'
import { CredentialsForm } from './CredentialsForm'

export function RegisterForm() {
  const [register] = useRegisterMutation()

  return (
    <CredentialsForm
      submitLabel="Зарегистрироваться"
      passwordAutocomplete="new-password"
      onSubmit={(values) => register(values).unwrap()}
    />
  )
}
