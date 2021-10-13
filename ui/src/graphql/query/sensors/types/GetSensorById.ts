/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSensorById
// ====================================================

export interface GetSensorById_az_sensors_Sensors_Location {
  __typename: "az_sensors_Locations";
  address: string | null;
  airlyLink: string | null;
  locationPoint: any;
  locationId: number;
  elevation: any;
}

export interface GetSensorById_az_sensors_Sensors_ServiceLogs_Document {
  __typename: "az_docs_Documents";
  fileIds: any;
}

export interface GetSensorById_az_sensors_Sensors_ServiceLogs {
  __typename: "az_sensors_ServiceLog";
  Document: GetSensorById_az_sensors_Sensors_ServiceLogs_Document;
}

export interface GetSensorById_az_sensors_Sensors_SensorFactors_PollutionFactor_e_measurement_unit {
  __typename: "az_sensors_e_measurement_unit";
  description: string | null;
}

export interface GetSensorById_az_sensors_Sensors_SensorFactors_PollutionFactor {
  __typename: "az_sensors_PollutionFactors";
  e_measurement_unit: GetSensorById_az_sensors_Sensors_SensorFactors_PollutionFactor_e_measurement_unit | null;
  label: string;
}

export interface GetSensorById_az_sensors_Sensors_SensorFactors {
  __typename: "az_sensors_SensorFactors";
  PollutionFactor: GetSensorById_az_sensors_Sensors_SensorFactors_PollutionFactor;
}

export interface GetSensorById_az_sensors_Sensors {
  __typename: "az_sensors_Sensors";
  sensorId: number;
  model: string | null;
  manufacturer: string | null;
  sideNumber: number | null;
  Location: GetSensorById_az_sensors_Sensors_Location;
  ServiceLogs: GetSensorById_az_sensors_Sensors_ServiceLogs[];
  SensorFactors: GetSensorById_az_sensors_Sensors_SensorFactors[];
  isActive: boolean;
}

export interface GetSensorById {
  az_sensors_Sensors: GetSensorById_az_sensors_Sensors[];
}

export interface GetSensorByIdVariables {
  id?: number | null;
}
