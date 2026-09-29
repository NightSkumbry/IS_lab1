import { baseApi, type Page } from '@/shared/api'
import type {
  Product,
  ProductInput,
  ProductsQuery,
  RatingGroup,
  ReducePriceInput,
  ReducePriceResult,
} from '../model/types'

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Page<Product>, ProductsQuery>({
      query: ({ page, size, sort, filters }) => ({
        url: '/products',
        params: { page, size, sort: sort && `${sort.field},${sort.direction}`, ...filters },
      }),
      providesTags: (result) => [
        { type: 'Product', id: 'LIST' },
        ...(result?.content ?? []).map(({ id }) => ({ type: 'Product' as const, id })),
      ],
    }),
    getProduct: build.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: build.mutation<Product, ProductInput>({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: build.mutation<Product, { id: number; data: ProductInput }>({
      query: ({ id, data }) => ({ url: `/products/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),
    deleteProduct: build.mutation<void, number>({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    getProductWithMinPartNumber: build.query<Product | null, void>({
      query: () => '/products/special/min-part-number',
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    getRatingGroups: build.query<RatingGroup[], void>({
      query: () => '/products/special/group-by-rating',
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    countProductsByPartNumber: build.query<{ count: number }, string>({
      query: (partNumber) => ({ url: '/products/special/count-by-part-number', params: { partNumber } }),
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    getProductsByManufacturer: build.query<Page<Product>, { organizationId: number; page: number; size: number }>({
      query: ({ organizationId, page, size }) => ({
        url: `/products/special/by-manufacturer/${organizationId}`,
        params: { page, size },
      }),
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    reducePrices: build.mutation<ReducePriceResult, ReducePriceInput>({
      query: (body) => ({ url: '/products/special/reduce-price', method: 'POST', body }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLazyGetProductWithMinPartNumberQuery,
  useLazyGetRatingGroupsQuery,
  useLazyCountProductsByPartNumberQuery,
  useGetProductsByManufacturerQuery,
  useReducePricesMutation,
} = productApi
