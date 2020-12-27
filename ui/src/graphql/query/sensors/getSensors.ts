import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetSensors } from './types/GetSensors'

export const GET_SENSOR_QUERY = gql`
  query GetSensors {
    az_sensors_Sensors {
      locationId
      manufacturer
      model
      sensorId
      sideNumber
      isActive
      Location {
        address
        airlyLink
        elevation
        locationId
        locationPoint
        mapsLink
      }
    }
  }
`

export const useGetSensors = () => useQuery<GetSensors>(GET_SENSOR_QUERY)