/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsetUser
// ====================================================

export interface UpsetUser_insert_az_users_Users_returning {
  __typename: "az_users_Users";
  userId: number;
}

export interface UpsetUser_insert_az_users_Users {
  __typename: "az_users_Users_mutation_response";
  returning: UpsetUser_insert_az_users_Users_returning[];
}

export interface UpsetUser {
  insert_az_users_Users: UpsetUser_insert_az_users_Users | null;
}

export interface UpsetUserVariables {
  userRole?: string | null;
  phoneNumber?: string | null;
  fullName?: string | null;
  email?: string | null;
  userId?: number | null;
  organisationId?: number | null;
}
