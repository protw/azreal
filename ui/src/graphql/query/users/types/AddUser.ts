/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_insert_az_users_Users_one {
  __typename: "az_users_Users";
  userId: number;
}

export interface AddUser {
  insert_az_users_Users_one: AddUser_insert_az_users_Users_one | null;
}

export interface AddUserVariables {
  userRole?: string | null;
  phoneNumber?: string | null;
  organisationId?: number | null;
  fullName?: string | null;
  email?: string | null;
}
