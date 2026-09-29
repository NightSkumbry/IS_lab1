import { baseApi, type Page } from '@/shared/api'
import type { Organization, OrganizationInput, OrganizationsQuery } from '../model/types'

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query<Page<Organization>, OrganizationsQuery>({
      query: ({ page, size, sort, filters }) => ({
        url: '/organizations',
        params: { page, size, sort: sort && `${sort.field},${sort.direction}`, ...filters },
      }),
      providesTags: (result) => [
        { type: 'Organization', id: 'LIST' },
        ...(result?.content ?? []).map(({ id }) => ({ type: 'Organization' as const, id })),
      ],
    }),
    getOrganization: build.query<Organization, number>({
      query: (id) => `/organizations/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Organization', id }],
    }),
    createOrganization: build.mutation<Organization, OrganizationInput>({
      query: (body) => ({ url: '/organizations', method: 'POST', body }),
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    }),
    updateOrganization: build.mutation<Organization, { id: number; data: OrganizationInput }>({
      query: ({ id, data }) => ({ url: `/organizations/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Organization', id },
        { type: 'Organization', id: 'LIST' },
        { type: 'Product', id: 'LIST' },
      ],
    }),
    deleteOrganization: build.mutation<void, number>({
      query: (id) => ({ url: `/organizations/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Organization', id },
        { type: 'Organization', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi
