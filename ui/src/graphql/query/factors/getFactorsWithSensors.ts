import { GetFactorsWithSensors } from './types/GetFactorsWithSensors'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_FACTORS_WITH_SENSORS = gql`
  query GetFactorsWithSensors {
    az_sensors_PollutionFactors_aggregate {
      nodes {
        label
        e_measurement_unit {
          description
        }
        maxValue
        name
        ukrainianLabel
        SensorFactors {
          Sensor {
            sensorId
            model
          }
        }
      }
    }
  }`

export const useGetFactors = () => useQuery<GetFactorsWithSensors>(GET_FACTORS_WITH_SENSORS) 