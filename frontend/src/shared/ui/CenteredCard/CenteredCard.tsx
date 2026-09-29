import type { ReactNode } from 'react'
import styles from './CenteredCard.module.css'

interface Props {
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function CenteredCard({ title, children, footer }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        {children}
        {footer && <p className={styles.footer}>{footer}</p>}
      </div>
    </div>
  )
}
