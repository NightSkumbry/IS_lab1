import type { Address } from '@/entities/address'
import type { Product } from '../model/types'
import styles from './ProductDetails.module.css'

const dash = '—'

function formatAddress(address: Address): string {
  const town = address.town
    ? `${address.town.name ?? dash} (${address.town.x}; ${address.town.y})`
    : dash
  return `индекс: ${address.zipCode ?? dash}, город: ${town}`
}

interface Props {
  product: Product
}

export function ProductDetails({ product }: Props) {
  const { manufacturer, owner } = product

  return (
    <div className={styles.root}>
      <section>
        <h3>Продукт</h3>
        <dl className={styles.list}>
          <dt>ID</dt>
          <dd>{product.id}</dd>
          <dt>Название</dt>
          <dd>{product.name}</dd>
          <dt>Координаты</dt>
          <dd>
            x: {product.coordinates.x}, y: {product.coordinates.y}
          </dd>
          <dt>Дата создания</dt>
          <dd>{new Date(product.creationDate).toLocaleString('ru-RU')}</dd>
          <dt>Единица измерения</dt>
          <dd>{product.unitOfMeasure}</dd>
          <dt>Цена</dt>
          <dd>{product.price}</dd>
          <dt>Себестоимость</dt>
          <dd>{product.manufactureCost ?? dash}</dd>
          <dt>Рейтинг</dt>
          <dd>{product.rating}</dd>
          <dt>Партийный номер</dt>
          <dd>{product.partNumber}</dd>
        </dl>
      </section>

      <section>
        <h3>Производитель</h3>
        <dl className={styles.list}>
          <dt>ID</dt>
          <dd>{manufacturer.id}</dd>
          <dt>Название</dt>
          <dd>{manufacturer.name}</dd>
          <dt>Тип</dt>
          <dd>{manufacturer.type ?? dash}</dd>
          <dt>Годовой оборот</dt>
          <dd>{manufacturer.annualTurnover}</dd>
          <dt>Сотрудников</dt>
          <dd>{manufacturer.employeesCount}</dd>
          <dt>Рейтинг</dt>
          <dd>{manufacturer.rating}</dd>
          <dt>Официальный адрес</dt>
          <dd>{formatAddress(manufacturer.officialAddress)}</dd>
          <dt>Почтовый адрес</dt>
          <dd>{formatAddress(manufacturer.postalAddress)}</dd>
        </dl>
      </section>

      <section>
        <h3>Владелец</h3>
        <dl className={styles.list}>
          <dt>Имя</dt>
          <dd>{owner.name}</dd>
          <dt>Цвет глаз</dt>
          <dd>{owner.eyeColor ?? dash}</dd>
          <dt>Цвет волос</dt>
          <dd>{owner.hairColor}</dd>
          <dt>Вес</dt>
          <dd>{owner.weight ?? dash}</dd>
          <dt>Национальность</dt>
          <dd>{owner.nationality}</dd>
          <dt>Местоположение</dt>
          <dd>
            {owner.location
              ? `${owner.location.name ?? dash} (${owner.location.x}; ${owner.location.y})`
              : dash}
          </dd>
        </dl>
      </section>
    </div>
  )
}
