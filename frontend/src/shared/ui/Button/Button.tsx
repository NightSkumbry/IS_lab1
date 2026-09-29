import type { ComponentProps } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'md' | 'sm' | 'icon'

interface Props extends ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ variant = 'primary', size = 'md', type = 'button', className, ...rest }: Props) {
  const classes = [styles.button, styles[size], styles[variant], className].filter(Boolean).join(' ')
  return <button type={type} className={classes} {...rest} />
}
