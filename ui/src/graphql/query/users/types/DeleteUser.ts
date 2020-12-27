/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser_delete_az_users_Users_returning {
  __typename: "az_users_Users";
  userId: number;
}

export interface DeleteUser_delete_az_users_Users {
  __typename: "az_users_Users_mutation_response";
  returning: DeleteUser_delete_az_users_Users_returning[];
}

export interface DeleteUser {
  delete_az_users_Users: DeleteUser_delete_az_users_Users | null;
}

export interface DeleteUserVariables {
  id?: number | null;
}
