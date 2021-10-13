import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AddSensor, AddSensorVariables } from './types/AddSensor'

export const ADD_SENSOR_QUERY = gql`
  mutation AddSensor($mapsLink: String = "", $locationPoint: point = "", $locationId: Int!, $elevation: float8 = "", $airlyLink: String = "", $address: String = "", $sensorId: Int!, $model: String = "", $manufacturer: String = "", $timestamp: timestamp!, $documentIds: _text = "{}", $photoIds: _text = "{}", $sensorFactors: [az_sensors_SensorFactors_insert_input!]! = {}, $sideNumber: Int = 0) {
    insert_az_sensors_Locations_one(object: {mapsLink: $mapsLink, locationPoint: $locationPoint, locationId: $locationId, elevation: $elevation, airlyLink: $airlyLink, address: $address}, on_conflict: {constraint: Locations_pkey, update_columns: [locationPoint, address, airlyLink, mapsLink, elevation, locationPoint]}) {
      locationId
    }
    insert_az_sensors_Sensors_one(object: {sensorId: $sensorId, model: $model, manufacturer: $manufacturer, locationId: $locationId, ServiceLogs: {data: {timestamp: $timestamp, Photo: {data: {fileIds: $photoIds}}, Document: {data: {documentType: Service, fileIds: $documentIds}}, serviceKind: Planned}}, SensorFactors: {data: $sensorFactors}, sideNumber: $sideNumber}, on_conflict: {constraint: Sensors_pkey, update_columns: [locationId, model, manufacturer]}) {
      sensorId
    }
    # update_az_measurements_Measurements(where: {sensorId: {_is_null: true}, locationPoint: {_eq: $locationPoint}}, _set: {sensorId: $sensorId}) {
    #   affected_rows
    # }
  }
`

export const useAddSensor = () => useMutation<AddSensor, AddSensorVariables>(ADD_SENSOR_QUERY)