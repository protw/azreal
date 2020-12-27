/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteOrganisation
// ====================================================

export interface DeleteOrganisation_delete_az_users_Organisation {
  __typename: "az_users_Organisation_mutation_response";
  affected_rows: number;
}

export interface DeleteOrganisation {
  delete_az_users_Organisation: DeleteOrganisation_delete_az_users_Organisation | null;
}

export interface DeleteOrganisationVariables {
  id?: number | null;
}
