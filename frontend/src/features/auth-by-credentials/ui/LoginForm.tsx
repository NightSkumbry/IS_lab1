import { useLoginMutation } from '@/entities/user'
import { CredentialsForm } from './CredentialsForm'

export function LoginForm() {
  const [login] = useLoginMutation()

  return (
    <CredentialsForm
      submitLabel="Войти"
      passwordAutocomplete="current-password"
      onSubmit={(values) => login(values).unwrap()}
    />
  )
}
