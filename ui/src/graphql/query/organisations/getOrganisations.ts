import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetOrganisations } from './types/GetOrganisations'

const GET_ORGANISATIONS = gql`
  query GetOrganisations {
    az_users_Organisation {
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

export const useGetOrganisations = () => useQuery<GetOrganisations>(GET_ORGANISATIONS)