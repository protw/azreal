/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_az_users_Users_Document {
  __typename: "az_docs_Documents";
  fileIds: any;
}

export interface GetUsers_az_users_Users_Organisation {
  __typename: "az_users_Organisation";
  shortName: string | null;
  fullName: string;
  organisationId: number;
}

export interface GetUsers_az_users_Users {
  __typename: "az_users_Users";
  email: string;
  fullName: string | null;
  phoneNumber: string | null;
  userRole: string | null;
  userId: number;
  Document: GetUsers_az_users_Users_Document | null;
  Organisation: GetUsers_az_users_Users_Organisation | null;
}

export interface GetUsers {
  az_users_Users: GetUsers_az_users_Users[];
}
