/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { az_sensors_e_service_kind_enum } from "./../../../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: DeleteServiceLog
// ====================================================

export interface DeleteServiceLog_delete_az_sensors_ServiceLog_returning {
  __typename: "az_sensors_ServiceLog";
  sensorId: number | null;
}

export interface DeleteServiceLog_delete_az_sensors_ServiceLog {
  __typename: "az_sensors_ServiceLog_mutation_response";
  returning: DeleteServiceLog_delete_az_sensors_ServiceLog_returning[];
}

export interface DeleteServiceLog {
  delete_az_sensors_ServiceLog: DeleteServiceLog_delete_az_sensors_ServiceLog | null;
}

export interface DeleteServiceLogVariables {
  sensorId: number;
  kind: az_sensors_e_service_kind_enum;
  timestamp: any;
}
