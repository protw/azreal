import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetLocation, GetLocationVariables } from './types/GetLocation'

const GET_LOCATION_BY_ID = gql`
  query GetLocation($locationId: Int) {
    az_sensors_Locations(where: {locationId: {_eq: $locationId}}) {
      Document {
        fileIds
      }
      address
      airlyLink
      elevation
      locationId
      locationPoint
      mapsLink
    }
  }
`

export const useGetLocationById = (locationId: number) => useQuery<GetLocation, GetLocationVariables>(GET_LOCATION_BY_ID, { variables: { locationId }})
