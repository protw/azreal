import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AddServiceLog, AddServiceLogVariables } from './types/AddServiceLog'

export const ADD_SERVICE_LOG = gql`
  mutation AddServiceLog($documentIds: _text! = "{}", $photoIds: _text! = "{}", $timestamp: timestamp! = "", $sensorId: Int! = 0, $serviceKind: az_sensors_e_service_kind_enum = Planned) {
    insert_az_sensors_ServiceLog_one(object: {Document: {data: {fileIds: $documentIds, documentType: Service}}, Photo: {data: {fileIds: $photoIds}}, timestamp: $timestamp, sensorId: $sensorId, serviceKind: $serviceKind}) {
      timestamp
      serviceKind
    }
  }
`

export const useAddServiceLog = () => useMutation<AddServiceLog, AddServiceLogVariables>(ADD_SERVICE_LOG)