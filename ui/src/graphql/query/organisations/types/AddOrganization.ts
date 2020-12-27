/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddOrganization
// ====================================================

export interface AddOrganization_insert_az_users_Organisation_one {
  __typename: "az_users_Organisation";
  organisationId: number;
}

export interface AddOrganization {
  insert_az_users_Organisation_one: AddOrganization_insert_az_users_Organisation_one | null;
}

export interface AddOrganizationVariables {
  shortName: string;
  rntrc: string;
  organisationRole: string;
  fullName: string;
  country?: string | null;
  documentIds?: any | null;
}
