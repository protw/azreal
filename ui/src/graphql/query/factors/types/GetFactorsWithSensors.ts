/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFactorsWithSensors
// ====================================================

export interface GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes_e_measurement_unit {
  __typename: "az_sensors_e_measurement_unit";
  description: string | null;
}

export interface GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes_SensorFactors_Sensor {
  __typename: "az_sensors_Sensors";
  sensorId: number;
  model: string | null;
}

export interface GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes_SensorFactors {
  __typename: "az_sensors_SensorFactors";
  Sensor: GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes_SensorFactors_Sensor;
}

export interface GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes {
  __typename: "az_sensors_PollutionFactors";
  label: string;
  e_measurement_unit: GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes_e_measurement_unit | null;
  maxValue: any | null;
  name: string;
  ukrainianLabel: string | null;
  SensorFactors: GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes_SensorFactors[];
}

export interface GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate {
  __typename: "az_sensors_PollutionFactors_aggregate";
  nodes: GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate_nodes[];
}

export interface GetFactorsWithSensors {
  az_sensors_PollutionFactors_aggregate: GetFactorsWithSensors_az_sensors_PollutionFactors_aggregate;
}
