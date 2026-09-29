import { useLocation } from 'react-router'
import { LinkButton } from '../LinkButton'
import styles from './PageHeader.module.css'

interface Props {
  title: string
  createLabel: string
  createTo: string
}

export function PageHeader({ title, createLabel, createTo }: Props) {
  const { search } = useLocation()

  return (
    <div className={styles.head}>
      <h1>{title}</h1>
      <LinkButton to={{ pathname: createTo, search }}>{createLabel}</LinkButton>
    </div>
  )
}
