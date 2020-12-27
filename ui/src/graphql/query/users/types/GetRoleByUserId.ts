/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRoleByUserId
// ====================================================

export interface GetRoleByUserId_az_users_Users {
  __typename: "az_users_Users";
  userRole: string | null;
}

export interface GetRoleByUserId {
  az_users_Users: GetRoleByUserId_az_users_Users[];
}

export interface GetRoleByUserIdVariables {
  userId?: number | null;
}
