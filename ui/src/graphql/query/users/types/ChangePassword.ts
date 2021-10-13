/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePassword
// ====================================================

export interface ChangePassword_insert_az_users_AuthData_one {
  __typename: "az_users_AuthData";
  userId: number;
}

export interface ChangePassword {
  insert_az_users_AuthData_one: ChangePassword_insert_az_users_AuthData_one | null;
}

export interface ChangePasswordVariables {
  password?: string | null;
  oldpassword?: string | null;
  userId?: number | null;
}
