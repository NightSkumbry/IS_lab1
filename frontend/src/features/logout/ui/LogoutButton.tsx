import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '@/entities/user'
import { baseApi } from '@/shared/api'
import { Button } from '@/shared/ui'

export function LogoutButton() {
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()

  const onClick = async () => {
    await logout()
    dispatch(baseApi.util.resetApiState())
  }

  return (
    <Button variant="secondary" onClick={onClick} disabled={isLoading}>
      Выйти
    </Button>
  )
}
