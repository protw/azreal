/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSensorsWithFactors
// ====================================================

export interface GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes_SensorFactors_PollutionFactor_e_measurement_unit {
  __typename: "az_sensors_e_measurement_unit";
  description: string | null;
}

export interface GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes_SensorFactors_PollutionFactor {
  __typename: "az_sensors_PollutionFactors";
  label: string;
  ukrainianLabel: string | null;
  e_measurement_unit: GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes_SensorFactors_PollutionFactor_e_measurement_unit | null;
  maxValue: any | null;
}

export interface GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes_SensorFactors {
  __typename: "az_sensors_SensorFactors";
  PollutionFactor: GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes_SensorFactors_PollutionFactor;
}

export interface GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes {
  __typename: "az_sensors_Sensors";
  SensorFactors: GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes_SensorFactors[];
  sensorId: number;
  model: string | null;
  manufacturer: string | null;
}

export interface GetSensorsWithFactors_az_sensors_Sensors_aggregate {
  __typename: "az_sensors_Sensors_aggregate";
  nodes: GetSensorsWithFactors_az_sensors_Sensors_aggregate_nodes[];
}

export interface GetSensorsWithFactors {
  az_sensors_Sensors_aggregate: GetSensorsWithFactors_az_sensors_Sensors_aggregate;
}
