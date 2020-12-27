import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetLocations } from './types/GetLocations'

const GET_LOCATIONS = gql`
  query GetLocations {
    az_sensors_Locations_aggregate {
      nodes {
        mapsLink
        locationPoint
        locationId
        elevation
        address
        airlyLink
        Document {
          fileIds
        }
      }
    }
  }`

export const useGetLocations = () => useQuery<GetLocations>(GET_LOCATIONS)
