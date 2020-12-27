import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetSensorById, GetSensorByIdVariables } from './types/GetSensorById'

const GET_SENSOR_BY_ID = gql`
query GetSensorById($id: Int = 10001) {
  az_sensors_Sensors(where: {sensorId: {_eq: $id}}) {
    sensorId
    model
    manufacturer
    sideNumber
    Location {
      address
      airlyLink
      locationPoint
      locationId
      elevation
    }
    ServiceLogs {
      Document {
        fileIds
      }
    }
    SensorFactors {
      PollutionFactor {
        e_measurement_unit {
          description
        }
        label
      }
    }
    isActive
  }
}
`

export const useGetSensorById = (id: number) => useQuery<GetSensorById, GetSensorByIdVariables>(GET_SENSOR_BY_ID, { variables: { id }})