import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { DeleteOrganisation, DeleteOrganisationVariables } from './types/DeleteOrganisation'

const DELETE_ORGANISATION = gql`
  mutation DeleteOrganisation($id: Int) {
    delete_az_users_Organisation(where: {organisationId: {_eq: $id}}) {
      affected_rows
    }
  }
`
export const useDeleteOrganisation = (id: number) => useMutation<DeleteOrganisation, DeleteOrganisationVariables>(DELETE_ORGANISATION, { variables: { id }})
