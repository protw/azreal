import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetOrganisation, GetOrganisationVariables } from './types/GetOrganisation'

const GET_ORGANISATION_BY_ID = gql`
  query GetOrganisation($id: Int) {
    az_users_Organisation(where: {organisationId: {_eq: $id}}) {
      shortName
      rntrc
      organisationRole
      organisationId
      fullName
      country
      Document {
        fileIds
      }
    }
  }
`

export const useGetOrganisationById = (id: number) => useQuery<GetOrganisation, GetOrganisationVariables>(GET_ORGANISATION_BY_ID, { variables: { id }})