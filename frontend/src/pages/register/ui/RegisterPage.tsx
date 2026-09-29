import { Link } from 'react-router'
import { RegisterForm } from '@/features/auth-by-credentials'
import { routes } from '@/shared/config'
import { CenteredCard } from '@/shared/ui'

export function RegisterPage() {
  return (
    <CenteredCard
      title="Регистрация"
      footer={
        <>
          Уже есть аккаунт? <Link to={routes.login}>Войти</Link>
        </>
      }
    >
      <RegisterForm />
    </CenteredCard>
  )
}
