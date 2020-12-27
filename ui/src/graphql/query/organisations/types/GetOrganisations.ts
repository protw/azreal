/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganisations
// ====================================================

export interface GetOrganisations_az_users_Organisation_Document {
  __typename: "az_docs_Documents";
  fileIds: any;
}

export interface GetOrganisations_az_users_Organisation {
  __typename: "az_users_Organisation";
  shortName: string | null;
  rntrc: string;
  organisationRole: string | null;
  organisationId: number;
  fullName: string;
  country: string | null;
  Document: GetOrganisations_az_users_Organisation_Document | null;
}

export interface GetOrganisations {
  az_users_Organisation: GetOrganisations_az_users_Organisation[];
}
