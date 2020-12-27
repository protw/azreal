/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { az_sensors_SensorFactors_insert_input } from "./../../../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: AddSensor
// ====================================================

export interface AddSensor_insert_az_sensors_Locations_one {
  __typename: "az_sensors_Locations";
  locationId: number;
}

export interface AddSensor_insert_az_sensors_Sensors_one {
  __typename: "az_sensors_Sensors";
  sensorId: number;
}

export interface AddSensor {
  insert_az_sensors_Locations_one: AddSensor_insert_az_sensors_Locations_one | null;
  insert_az_sensors_Sensors_one: AddSensor_insert_az_sensors_Sensors_one | null;
}

export interface AddSensorVariables {
  mapsLink?: string | null;
  locationPoint?: any | null;
  locationId: number;
  elevation?: any | null;
  airlyLink?: string | null;
  address?: string | null;
  sensorId: number;
  model?: string | null;
  manufacturer?: string | null;
  timestamp: any;
  documentIds?: any | null;
  photoIds?: any | null;
  sensorFactors: az_sensors_SensorFactors_insert_input[];
  sideNumber?: number | null;
}
