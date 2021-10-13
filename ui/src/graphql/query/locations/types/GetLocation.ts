/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLocation
// ====================================================

export interface GetLocation_az_sensors_Locations_Document {
  __typename: "az_docs_Documents";
  fileIds: any;
}

export interface GetLocation_az_sensors_Locations {
  __typename: "az_sensors_Locations";
  Document: GetLocation_az_sensors_Locations_Document | null;
  address: string | null;
  airlyLink: string | null;
  elevation: any;
  locationId: number;
  locationPoint: any;
  mapsLink: string | null;
}

export interface GetLocation {
  az_sensors_Locations: GetLocation_az_sensors_Locations[];
}

export interface GetLocationVariables {
  locationId?: number | null;
}
