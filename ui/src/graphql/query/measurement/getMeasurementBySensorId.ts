import { useQuery } from '@apollo/react-hooks'
import { ApolloQueryResult, gql } from 'apollo-boost'
import { GetMeasurementsBySensorId, GetMeasurementsBySensorIdVariables } from './types/GetMeasurementsBySensorId'

export const GET_MEASUREMENT_BY_SENSOR_ID = gql`
  query GetMeasurementsBySensorId($sensorId: Int! = 0, $from: timestamp, $to: timestamp) {
    az_sensors_Sensors(where: {sensorId: {_eq: $sensorId}}) {
      SensorFactors {
        PollutionFactor {
          e_measurement_unit {
            description
          }
          maxValue
          name
          label
          Measurements_aggregate(where: {timestamp: {_lte: $to, _gte: $from}, sensorId: {_eq: $sensorId}}) {
            aggregate {
              avg {
                value
                CAQI
              }
            }
          }
          ukrainianLabel
        }
      }
    }
  }
`

export type CommonAggregationData = {
  sensorId: number,
  from: string,
  to: string
}

export const useGetMeasurementsBySensorId = () => {
  const query = useQuery(GET_MEASUREMENT_BY_SENSOR_ID).client.query

  return (variables: CommonAggregationData) => query<GetMeasurementsBySensorId, GetMeasurementsBySensorIdVariables>({ variables, query: GET_MEASUREMENT_BY_SENSOR_ID })
}

export type GetMeasuremensFn = (variables: CommonAggregationData) => Promise<ApolloQueryResult<GetMeasurementsBySensorId>>