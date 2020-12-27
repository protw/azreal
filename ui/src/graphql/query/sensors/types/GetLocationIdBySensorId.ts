/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLocationIdBySensorId
// ====================================================

export interface GetLocationIdBySensorId_az_sensors_Sensors {
  __typename: "az_sensors_Sensors";
  locationId: number;
}

export interface GetLocationIdBySensorId {
  az_sensors_Sensors: GetLocationIdBySensorId_az_sensors_Sensors[];
}

export interface GetLocationIdBySensorIdVariables {
  sensorId: number;
}
