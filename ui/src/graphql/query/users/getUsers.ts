import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetUsers } from './types/GetUsers'

const GET_USERS = gql`
  query GetUsers {
    az_users_Users {
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

export const useGetUsers = () => useQuery<GetUsers>(GET_USERS)