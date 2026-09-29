import { formValuesToInput, useCreateProductMutation } from '@/entities/product'
import { ProductForm } from '@/features/product-form'

interface Props {
  onSuccess: () => void
  onCancel: () => void
}

export function CreateProductForm({ onSuccess, onCancel }: Props) {
  const [createProduct] = useCreateProductMutation()

  return (
    <ProductForm
      submitLabel="Создать"
      onCancel={onCancel}
      onSubmit={async (values) => {
        await createProduct(formValuesToInput(values)).unwrap()
        onSuccess()
      }}
    />
  )
}
