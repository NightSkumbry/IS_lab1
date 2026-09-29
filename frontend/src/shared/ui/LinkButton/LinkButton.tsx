import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import buttonStyles from '../Button/Button.module.css'
import type { ButtonSize, ButtonVariant } from '../Button/Button'

interface Props extends ComponentProps<typeof Link> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function LinkButton({ variant = 'primary', size = 'md', className, ...rest }: Props) {
  const classes = [buttonStyles.button, buttonStyles[size], buttonStyles[variant], className]
    .filter(Boolean)
    .join(' ')
  return <Link className={classes} {...rest} />
}
