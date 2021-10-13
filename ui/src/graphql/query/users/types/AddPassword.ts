/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPassword
// ====================================================

export interface AddPassword_insert_az_users_AuthData_one {
  __typename: "az_users_AuthData";
  userId: number;
}

export interface AddPassword {
  insert_az_users_AuthData_one: AddPassword_insert_az_users_AuthData_one | null;
}

export interface AddPasswordVariables {
  userId?: number | null;
  password?: string | null;
}
