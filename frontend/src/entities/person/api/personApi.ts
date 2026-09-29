import { baseApi, type Page } from '@/shared/api'
import type { Person, PersonInput, PersonsQuery } from '../model/types'

export const personApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPersons: build.query<Page<Person>, PersonsQuery>({
      query: ({ page, size, sort, filters }) => ({
        url: '/persons',
        params: { page, size, sort: sort && `${sort.field},${sort.direction}`, ...filters },
      }),
      providesTags: (result) => [
        { type: 'Person', id: 'LIST' },
        ...(result?.content ?? []).map(({ id }) => ({ type: 'Person' as const, id })),
      ],
    }),
    getPerson: build.query<Person, number>({
      query: (id) => `/persons/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Person', id }],
    }),
    createPerson: build.mutation<Person, PersonInput>({
      query: (body) => ({ url: '/persons', method: 'POST', body }),
      invalidatesTags: [{ type: 'Person', id: 'LIST' }],
    }),
    updatePerson: build.mutation<Person, { id: number; data: PersonInput }>({
      query: ({ id, data }) => ({ url: `/persons/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Person', id },
        { type: 'Person', id: 'LIST' },
        { type: 'Product', id: 'LIST' },
      ],
    }),
    deletePerson: build.mutation<void, number>({
      query: (id) => ({ url: `/persons/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Person', id },
        { type: 'Person', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetPersonsQuery,
  useGetPersonQuery,
  useCreatePersonMutation,
  useUpdatePersonMutation,
  useDeletePersonMutation,
} = personApi
