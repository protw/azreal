import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { UpdateSensorById, UpdateSensorByIdVariables } from './types/UpdateSensorById'

const UPDATE_SENSOR_BY_ID = gql`
  mutation UpdateSensorById($manufacturer: String, $model: String, $id: Int, $sideNumber: Int) {
    update_az_sensors_Sensors(where: {sensorId: {_eq: $id}}, _set: {manufacturer: $manufacturer, model: $model, sideNumber: $sideNumber}) {
      returning {
        sensorId
      }
    }
  }
`
export const useUpdateSensorById = (id: number) => useMutation<UpdateSensorById, UpdateSensorByIdVariables>(UPDATE_SENSOR_BY_ID, { variables: { id }})