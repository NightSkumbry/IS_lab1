import { Link } from 'react-router'
import { LoginForm } from '@/features/auth-by-credentials'
import { routes } from '@/shared/config'
import { CenteredCard } from '@/shared/ui'

export function LoginPage() {
  return (
    <CenteredCard
      title="Вход"
      footer={
        <>
          Нет аккаунта? <Link to={routes.register}>Зарегистрироваться</Link>
        </>
      }
    >
      <LoginForm />
    </CenteredCard>
  )
}
