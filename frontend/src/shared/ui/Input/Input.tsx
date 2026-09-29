import type { ComponentPropsWithRef } from 'react'
import styles from './Input.module.css'

interface Props extends ComponentPropsWithRef<'input'> {
  invalid?: boolean
}

export function Input({ invalid, className, ...rest }: Props) {
  const classes = [styles.input, invalid && styles.invalid, className].filter(Boolean).join(' ')
  return <input className={classes} aria-invalid={invalid || undefined} {...rest} />
}
