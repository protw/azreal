/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { az_sensors_e_service_kind_enum } from "./../../../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetServiceLogs
// ====================================================

export interface GetServiceLogs_az_sensors_ServiceLog_Document {
  __typename: "az_docs_Documents";
  fileIds: any;
}

export interface GetServiceLogs_az_sensors_ServiceLog_Photo {
  __typename: "az_docs_Photo";
  fileIds: any;
}

export interface GetServiceLogs_az_sensors_ServiceLog_Sensor_Location {
  __typename: "az_sensors_Locations";
  address: string | null;
  airlyLink: string | null;
}

export interface GetServiceLogs_az_sensors_ServiceLog_Sensor {
  __typename: "az_sensors_Sensors";
  Location: GetServiceLogs_az_sensors_ServiceLog_Sensor_Location;
}

export interface GetServiceLogs_az_sensors_ServiceLog {
  __typename: "az_sensors_ServiceLog";
  timestamp: any;
  serviceKind: az_sensors_e_service_kind_enum;
  sensorId: number | null;
  Document: GetServiceLogs_az_sensors_ServiceLog_Document;
  Photo: GetServiceLogs_az_sensors_ServiceLog_Photo | null;
  Sensor: GetServiceLogs_az_sensors_ServiceLog_Sensor | null;
}

export interface GetServiceLogs {
  az_sensors_ServiceLog: GetServiceLogs_az_sensors_ServiceLog[];
}

export interface GetServiceLogsVariables {
  sensorId?: number | null;
  from?: any | null;
  to?: any | null;
}
