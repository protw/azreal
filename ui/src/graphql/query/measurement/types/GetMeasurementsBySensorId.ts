/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMeasurementsBySensorId
// ====================================================

export interface GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_e_measurement_unit {
  __typename: "az_sensors_e_measurement_unit";
  description: string | null;
}

export interface GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_Measurements_aggregate_aggregate_avg {
  __typename: "az_measurements_Measurements_avg_fields";
  value: number | null;
  CAQI: number | null;
}

export interface GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_Measurements_aggregate_aggregate {
  __typename: "az_measurements_Measurements_aggregate_fields";
  avg: GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_Measurements_aggregate_aggregate_avg | null;
}

export interface GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_Measurements_aggregate {
  __typename: "az_measurements_Measurements_aggregate";
  aggregate: GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_Measurements_aggregate_aggregate | null;
}

export interface GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor {
  __typename: "az_sensors_PollutionFactors";
  e_measurement_unit: GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_e_measurement_unit | null;
  maxValue: any | null;
  name: string;
  label: string;
  Measurements_aggregate: GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor_Measurements_aggregate;
  ukrainianLabel: string | null;
}

export interface GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors {
  __typename: "az_sensors_SensorFactors";
  PollutionFactor: GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors_PollutionFactor;
}

export interface GetMeasurementsBySensorId_az_sensors_Sensors {
  __typename: "az_sensors_Sensors";
  SensorFactors: GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors[];
}

export interface GetMeasurementsBySensorId {
  az_sensors_Sensors: GetMeasurementsBySensorId_az_sensors_Sensors[];
}

export interface GetMeasurementsBySensorIdVariables {
  sensorId: number;
  from?: any | null;
  to?: any | null;
}
