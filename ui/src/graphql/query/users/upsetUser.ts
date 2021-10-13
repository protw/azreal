import { MutationTuple, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AddPassword, AddPasswordVariables } from './types/AddPassword'
import { AddUser, AddUserVariables } from './types/AddUser'
import { UpsetUser, UpsetUserVariables } from './types/UpsetUser'
import { MutationFunctionOptions } from '@apollo/react-common'

export const ADD_USER= gql`
  mutation AddUser($userRole: String = "", $phoneNumber: String = "", $organisationId: Int, $fullName: String = "", $email: String = "") {
    insert_az_users_Users_one(object: {email: $email, fullName: $fullName, organisationId: $organisationId, phoneNumber: $phoneNumber, userRole: $userRole}) {
      userId
    }
  }
`

export const ADD_PASSWORD= gql`
  mutation AddPassword($userId: Int = 0, $password: String = "") {
    insert_az_users_AuthData_one(object: {userId: $userId, password: $password}) {
      userId
    }
  }
`

const UPSET_USER = gql`
  mutation UpsetUser($userRole: String = "user", $phoneNumber: String, $fullName: String, $email: String, $userId: Int, $organisationId: Int) {
    insert_az_users_Users(objects: {email: $email, fullName: $fullName, phoneNumber: $phoneNumber, userRole: $userRole, organisationId: $organisationId, userId: $userId}, on_conflict: {constraint: Users_pkey, update_columns: [documentId, email, userRole, phoneNumber, fullName, organisationId], where: {userId: {_is_null: false}}}) {
      returning {
        userId
      }
    }
  }
`

export const useUpdateUser = (id: number) => useMutation<UpsetUser, UpsetUserVariables>(UPSET_USER, { variables: { userId: id }})


type AddUserAndPasswordVariables = AddUserVariables & {
  password: string
}

export const useAddUser = () => {
  const [ addUser ] = useMutation<AddUser, AddUserVariables>(ADD_USER)
  const [ addPassword, data ] = useMutation<AddPassword, AddPasswordVariables>(ADD_PASSWORD)

  const add = async ({ variables: { password, ...variables } }: MutationFunctionOptions<AddPassword, AddUserAndPasswordVariables>) => {
    const { data } = await addUser({ variables: variables })
    return addPassword({ variables: {
      userId: data.insert_az_users_Users_one.userId,
      password
    }})
  }

  return [ add, data ] as MutationTuple<AddPassword, AddUserAndPasswordVariables>
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useUpsetUser = (id?: number) => (id ? useUpdateUser(id) : useAddUser()) as MutationTuple<AddPassword, AddUserAndPasswordVariables>