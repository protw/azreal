import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetLocationIdBySensorId, GetLocationIdBySensorIdVariables } from './types/GetLocationIdBySensorId'

export const Get_LOCATION_ID_BY_SENSOR_ID = gql`
  query GetLocationIdBySensorId($sensorId: Int! = 0) {
    az_sensors_Sensors(where: {sensorId: {_eq: $sensorId}}) {
      locationId
    }
  }
`
export const useGetLocationIdBySensorId = (sensorId) => useQuery<GetLocationIdBySensorId, GetLocationIdBySensorIdVariables>(Get_LOCATION_ID_BY_SENSOR_ID, { variables: sensorId })