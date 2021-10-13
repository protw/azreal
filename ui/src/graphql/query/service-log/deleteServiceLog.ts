import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { DeleteServiceLogVariables, DeleteServiceLog } from './types/DeleteServiceLog'

export const DELETE_SERVICE_LOG = gql`
  mutation DeleteServiceLog($sensorId: Int! = 0, $kind: az_sensors_e_service_kind_enum!, $timestamp: timestamp!) {
    delete_az_sensors_ServiceLog(where: {sensorId: {_eq: $sensorId}, serviceKind: {_eq: $kind}, timestamp: {_eq: $timestamp}}) {
      returning {
        sensorId
      }
    }
  }
`

export const useDeleteServiceLog = (variables: DeleteServiceLogVariables) => useMutation<DeleteServiceLog>(DELETE_SERVICE_LOG, { variables })