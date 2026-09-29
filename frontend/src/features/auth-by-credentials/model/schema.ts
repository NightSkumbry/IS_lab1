import { z } from 'zod'

export const credentialsSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Имя должно содержать не менее 3 символов')
    .max(50, 'Имя должно содержать не более 50 символов'),
  password: z
    .string()
    .min(4, 'Пароль должен содержать не менее 4 символов')
    .max(100, 'Пароль должен содержать не более 100 символов'),
})

export type CredentialsFormValues = z.infer<typeof credentialsSchema>
