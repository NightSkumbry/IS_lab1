import type { ComponentPropsWithRef } from 'react'
import styles from './Select.module.css'

interface Props extends ComponentPropsWithRef<'select'> {
  invalid?: boolean
}

export function Select({ invalid, className, ...rest }: Props) {
  const classes = [styles.select, invalid && styles.invalid, className].filter(Boolean).join(' ')
  return <select className={classes} aria-invalid={invalid || undefined} {...rest} />
}
