import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { DeleteSensorById, DeleteSensorByIdVariables } from './types/DeleteSensorById'

const DELETE_SENSOR_BY_ID = gql`
  mutation DeleteSensorById($id: Int) {
    delete_az_sensors_Sensors(where: {sensorId: {_eq: $id}}) {
      returning {
        sensorId
      }
    }
  }`

export const useDeleteSensorById = (id: number) => useMutation<DeleteSensorById, DeleteSensorByIdVariables>(DELETE_SENSOR_BY_ID, { variables: { id }})