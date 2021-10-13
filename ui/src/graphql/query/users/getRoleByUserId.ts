import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetRoleByUserId, GetRoleByUserIdVariables } from './types/GetRoleByUserId'

export const GET_ROLE_BY_USER_ID = gql`
  query GetRoleByUserId($userId: Int = 0) {
    az_users_Users(where: {userId: {_eq: $userId}}) {
      userRole
    }
  }`

export const useGetMyRole = (userId: number) => useQuery<GetRoleByUserId, GetRoleByUserIdVariables>(GET_ROLE_BY_USER_ID, { variables: { userId } })