import { EuiSelect, EuiSelectProps } from '@elastic/eui'
import React from 'react'
import { useGetOrganisations } from 'src/graphql/query/organisations/getOrganisations'
import { Loading } from '../utils/loading'

export const OrganisationSelect = (props: EuiSelectProps) => {
  const { data, error, loading } = useGetOrganisations()

  if (loading) return <Loading />

  if (error) return null

  const options = data.az_users_Organisation
    .map(({ organisationId, shortName, fullName }) => ({ value: organisationId, text: shortName || fullName }))

  return <EuiSelect
    id="role-selector"
    fullWidth
    options={options}
    {...props}
  />
}