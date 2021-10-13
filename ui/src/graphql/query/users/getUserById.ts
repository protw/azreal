import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetUserById, GetUserByIdVariables } from './types/GetUserById'

const GET_USER_BY_ID = gql`
  query GetUserById($userId: Int = 0) {
    az_users_Users(where: {userId: {_eq: $userId}}) {
      email
      fullName
      phoneNumber
      userRole
      userId
      Document {
        fileIds
      }
      Organisation {
        shortName
        fullName
        organisationId
      }
    }
  }
`

export const useGetUsersById = (id: number) => useQuery<GetUserById, GetUserByIdVariables>(GET_USER_BY_ID, { variables: { userId: id }})