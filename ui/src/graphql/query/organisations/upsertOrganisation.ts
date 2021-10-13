import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { UpsertOrganisation, UpsertOrganisationVariables } from './types/UpsertOrganisation'

const UPSERT_ORGANISATION = gql`
  mutation UpsertOrganisation($shortName: String, $rntrc: String, $organisationRole: String, $fullName: String, $country: String, $organisationId: Int!) {
    insert_az_users_Organisation_one(object: {shortName: $shortName, rntrc: $rntrc, organisationRole: $organisationRole, fullName: $fullName, country: $country, organisationId: $organisationId}, on_conflict: {constraint: Organisation_pkey, update_columns: [ fullName, shortName, organisationRole, country ]}) {
      organisationId
    }
  }
`

const ADD_ORGANISATION = gql`
  mutation AddOrganization($shortName: String! = "", $rntrc: String! = "", $organisationRole: String! = "", $fullName: String! = "", $country: String = "", $documentIds: _text = "") {
    insert_az_users_Organisation_one(object: {shortName: $shortName, rntrc: $rntrc, organisationRole: $organisationRole, fullName: $fullName, country: $country, Document: {data: {fileIds: $documentIds, documentType: Organisation}}}) {
      organisationId
    }
  }
`

export const useUpsetOrganisation = (id?: number) => useMutation<UpsertOrganisation, UpsertOrganisationVariables>(id ? UPSERT_ORGANISATION : ADD_ORGANISATION, { variables: { organisationId: id } as any})