/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSensorById
// ====================================================

export interface DeleteSensorById_delete_az_sensors_Sensors_returning {
  __typename: "az_sensors_Sensors";
  sensorId: number;
}

export interface DeleteSensorById_delete_az_sensors_Sensors {
  __typename: "az_sensors_Sensors_mutation_response";
  returning: DeleteSensorById_delete_az_sensors_Sensors_returning[];
}

export interface DeleteSensorById {
  delete_az_sensors_Sensors: DeleteSensorById_delete_az_sensors_Sensors | null;
}

export interface DeleteSensorByIdVariables {
  id?: number | null;
}
