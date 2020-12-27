import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { DeleteUser, DeleteUserVariables } from './types/DeleteUser'

const DELETE_USER = gql`
  mutation DeleteUser($id: Int) {
    delete_az_users_Users(where: {userId: {_eq: $id}}) {
      returning {
        userId
      }
    }
  }
`
export const useDeleteUser = (id: number) => useMutation<DeleteUser, DeleteUserVariables>(DELETE_USER, { variables: { id }})
