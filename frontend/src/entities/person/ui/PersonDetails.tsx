import type { Person } from '../model/types'
import styles from './PersonDetails.module.css'

const dash = '—'

interface Props {
  person: Person
}

export function PersonDetails({ person }: Props) {
  return (
    <div className={styles.root}>
      <dl className={styles.list}>
        <dt>ID</dt>
        <dd>{person.id}</dd>
        <dt>Имя</dt>
        <dd>{person.name}</dd>
        <dt>Цвет глаз</dt>
        <dd>{person.eyeColor ?? dash}</dd>
        <dt>Цвет волос</dt>
        <dd>{person.hairColor}</dd>
        <dt>Вес</dt>
        <dd>{person.weight ?? dash}</dd>
        <dt>Национальность</dt>
        <dd>{person.nationality}</dd>
        <dt>Местоположение</dt>
        <dd>
          {person.location
            ? `${person.location.name ?? dash} (${person.location.x}; ${person.location.y})`
            : dash}
        </dd>
      </dl>
    </div>
  )
}
