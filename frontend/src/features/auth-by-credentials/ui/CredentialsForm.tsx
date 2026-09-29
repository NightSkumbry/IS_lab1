import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getErrorMessage } from '@/shared/api'
import { applyServerErrors } from '@/shared/lib'
import { Button, FormField, Input } from '@/shared/ui'
import { credentialsSchema, type CredentialsFormValues } from '../model/schema'
import styles from './CredentialsForm.module.css'

interface Props {
  submitLabel: string
  onSubmit: (values: CredentialsFormValues) => Promise<unknown>
  passwordAutocomplete: 'current-password' | 'new-password'
}

export function CredentialsForm({ submitLabel, onSubmit, passwordAutocomplete }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CredentialsFormValues>({ resolver: zodResolver(credentialsSchema) })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      if (!applyServerErrors(error, setError)) {
        setError('root.server', { message: getErrorMessage(error) })
      }
    }
  })

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <FormField label="Имя пользователя" error={errors.username?.message}>
        <Input
          autoComplete="username"
          autoFocus
          invalid={!!errors.username}
          {...register('username')}
        />
      </FormField>
      <FormField label="Пароль" error={errors.password?.message}>
        <Input
          type="password"
          autoComplete={passwordAutocomplete}
          invalid={!!errors.password}
          {...register('password')}
        />
      </FormField>
      {errors.root?.server && (
        <p className={styles.rootError} role="alert">
          {errors.root.server.message}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  )
}
