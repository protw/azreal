import { GetSensorsWithFactors } from './types/GetSensorsWithFactors'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const GET_SENSORS_WITH_FACTORS = gql`
    query GetSensorsWithFactors {
  az_sensors_Sensors_aggregate {
    nodes {
      SensorFactors {
        PollutionFactor {
          label
          ukrainianLabel
          e_measurement_unit {
            description
          }
          maxValue
        }
      }
      sensorId
      model
      manufacturer
    }
  }
}`

export const useGetSensors = () => useQuery<GetSensorsWithFactors>(GET_SENSORS_WITH_FACTORS)
