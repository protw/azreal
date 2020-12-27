import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetServiceLogs, GetServiceLogsVariables } from './types/GetServiceLogs'

export const GET_SERVICE_LOGS =gql`
query GetServiceLogs($sensorId: Int, $from: timestamp, $to: timestamp) {
  az_sensors_ServiceLog(order_by: {timestamp: desc}, where: {sensorId: {_eq: $sensorId}, timestamp: {_gte: $from, _lte: $to}}) {
    timestamp
    serviceKind
    sensorId
    Document {
      fileIds
    }
    Photo {
      fileIds
    }
    Sensor {
      Location {
        address
        airlyLink
      }
    }
  }
}
`

export const useGetServiceLogs = () => {
  const query = useQuery(GET_SERVICE_LOGS).client.query

  return (variables: GetServiceLogsVariables) =>
    query<GetServiceLogs>({ variables, query: GET_SERVICE_LOGS })
}