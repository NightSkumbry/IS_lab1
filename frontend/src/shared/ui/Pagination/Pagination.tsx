import { Button } from '../Button'
import styles from './Pagination.module.css'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: Props) {
  const last = Math.max(totalPages - 1, 0)

  return (
    <nav className={styles.root} aria-label="Пагинация">
      <Button variant="secondary" size="sm" disabled={page <= 0} onClick={() => onChange(0)} aria-label="Первая">
        «
      </Button>
      <Button variant="secondary" size="sm" disabled={page <= 0} onClick={() => onChange(page - 1)}>
        Назад
      </Button>
      <span className={styles.info}>
        Страница {page + 1} из {Math.max(totalPages, 1)}
      </span>
      <Button variant="secondary" size="sm" disabled={page >= last} onClick={() => onChange(page + 1)}>
        Вперёд
      </Button>
      <Button
        variant="secondary"
        size="sm"
        disabled={page >= last}
        onClick={() => onChange(last)}
        aria-label="Последняя"
      >
        »
      </Button>
    </nav>
  )
}
