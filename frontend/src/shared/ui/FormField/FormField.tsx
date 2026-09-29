import type { ReactNode } from 'react'
import styles from './FormField.module.css'

interface Props {
  label: string
  error?: string
  children: ReactNode
}

export function FormField({ label, error, children }: Props) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
