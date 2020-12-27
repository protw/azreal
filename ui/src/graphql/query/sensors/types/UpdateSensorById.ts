/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSensorById
// ====================================================

export interface UpdateSensorById_update_az_sensors_Sensors_returning {
  __typename: "az_sensors_Sensors";
  sensorId: number;
}

export interface UpdateSensorById_update_az_sensors_Sensors {
  __typename: "az_sensors_Sensors_mutation_response";
  returning: UpdateSensorById_update_az_sensors_Sensors_returning[];
}

export interface UpdateSensorById {
  update_az_sensors_Sensors: UpdateSensorById_update_az_sensors_Sensors | null;
}

export interface UpdateSensorByIdVariables {
  manufacturer?: string | null;
  model?: string | null;
  id?: number | null;
  sideNumber?: number | null;
}
