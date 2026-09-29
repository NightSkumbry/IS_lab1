import type { Address } from '@/entities/address'
import type { Organization } from '../model/types'
import styles from './OrganizationDetails.module.css'

const dash = '—'

function formatAddress(address: Address): string {
  const town = address.town
    ? `${address.town.name ?? dash} (${address.town.x}; ${address.town.y})`
    : dash
  return `индекс: ${address.zipCode ?? dash}, город: ${town}`
}

interface Props {
  organization: Organization
}

export function OrganizationDetails({ organization }: Props) {
  return (
    <div className={styles.root}>
      <dl className={styles.list}>
        <dt>ID</dt>
        <dd>{organization.id}</dd>
        <dt>Название</dt>
        <dd>{organization.name}</dd>
        <dt>Тип</dt>
        <dd>{organization.type ?? dash}</dd>
        <dt>Годовой оборот</dt>
        <dd>{organization.annualTurnover}</dd>
        <dt>Сотрудников</dt>
        <dd>{organization.employeesCount}</dd>
        <dt>Рейтинг</dt>
        <dd>{organization.rating}</dd>
        <dt>Официальный адрес</dt>
        <dd>{formatAddress(organization.officialAddress)}</dd>
        <dt>Почтовый адрес</dt>
        <dd>{formatAddress(organization.postalAddress)}</dd>
      </dl>
    </div>
  )
}
