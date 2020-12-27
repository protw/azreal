/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganisation
// ====================================================

export interface GetOrganisation_az_users_Organisation_Document {
  __typename: "az_docs_Documents";
  fileIds: any;
}

export interface GetOrganisation_az_users_Organisation {
  __typename: "az_users_Organisation";
  shortName: string | null;
  rntrc: string;
  organisationRole: string | null;
  organisationId: number;
  fullName: string;
  country: string | null;
  Document: GetOrganisation_az_users_Organisation_Document | null;
}

export interface GetOrganisation {
  az_users_Organisation: GetOrganisation_az_users_Organisation[];
}

export interface GetOrganisationVariables {
  id?: number | null;
}
