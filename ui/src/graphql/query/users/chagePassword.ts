import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { ChangePassword, ChangePasswordVariables } from './types/ChangePassword'

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String, $oldpassword: String, $userId: Int) {
    insert_az_users_AuthData_one(object: {password: $password, userId: $userId}, on_conflict: {constraint: AuthData_pkey, update_columns: password, where: {password: {_eq: $oldpassword}}}) {
      userId
    }
  }
`

export const useChangePassword = () => useMutation<ChangePassword, ChangePasswordVariables>(CHANGE_PASSWORD)