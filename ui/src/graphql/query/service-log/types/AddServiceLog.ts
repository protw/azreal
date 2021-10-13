/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { az_sensors_e_service_kind_enum } from "./../../../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: AddServiceLog
// ====================================================

export interface AddServiceLog_insert_az_sensors_ServiceLog_one {
  __typename: "az_sensors_ServiceLog";
  timestamp: any;
  serviceKind: az_sensors_e_service_kind_enum;
}

export interface AddServiceLog {
  insert_az_sensors_ServiceLog_one: AddServiceLog_insert_az_sensors_ServiceLog_one | null;
}

export interface AddServiceLogVariables {
  documentIds: any;
  photoIds: any;
  timestamp: any;
  sensorId: number;
  serviceKind?: az_sensors_e_service_kind_enum | null;
}
