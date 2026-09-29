import { formValuesToInput, productToFormValues, useUpdateProductMutation, type Product } from '@/entities/product'
import { ProductForm } from '@/features/product-form'

interface Props {
  product: Product
  onSuccess: () => void
  onCancel: () => void
}

export function EditProductForm({ product, onSuccess, onCancel }: Props) {
  const [updateProduct] = useUpdateProductMutation()

  return (
    <ProductForm
      submitLabel="Сохранить"
      defaultValues={productToFormValues(product)}
      onCancel={onCancel}
      onSubmit={async (values) => {
        await updateProduct({ id: product.id, data: formValuesToInput(values) }).unwrap()
        onSuccess()
      }}
    />
  )
}
