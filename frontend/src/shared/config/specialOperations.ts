export interface SpecialOperationMeta {
  slug: string
  title: string
  description: string
}

export const SPECIAL_OPERATIONS: SpecialOperationMeta[] = [
  {
    slug: 'min-part-number',
    title: 'Минимальный партийный номер',
    description: 'Вернуть один (любой) объект с минимальным по алфавиту значением partNumber',
  },
  {
    slug: 'rating-groups',
    title: 'Группировка по рейтингу',
    description: 'Сгруппировать объекты по значению rating и показать количество в каждой группе',
  },
  {
    slug: 'count-by-part-number',
    title: 'Количество по партийному номеру',
    description: 'Вернуть число объектов с заданным (точным) значением partNumber',
  },
  {
    slug: 'by-manufacturer',
    title: 'Продукция производителя',
    description: 'Показать всю продукцию выбранного производителя',
  },
  {
    slug: 'reduce-price',
    title: 'Снижение цены',
    description: 'Снизить цену всей продукции на указанный процент',
  },
]
