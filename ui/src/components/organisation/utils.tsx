import { GetOrganisation_az_users_Organisation as OrganisationType } from '../../graphql/query/organisations/types/GetOrganisation'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetOrganisationById } from 'src/graphql/query/organisations/getOrganisationById'
import { NotFoundPage } from '../utils/NotFoundPage'
import { Loading } from '../utils/loading'

type OrganisationKeys = keyof Omit<OrganisationType, 'Document'> | 'documentIds'
export type OrganisationSchema = Record<OrganisationKeys, any>

const yupRequiredStr = yup.string().required()

export const organisationSchema = yup.object().shape({
  fullName: yupRequiredStr,
  shortName: yupRequiredStr,
  country: yupRequiredStr,
  organisationRole: yupRequiredStr,
  documentIds: yup.string(),
  rntrc: yup.number().required().min(8)
} as OrganisationSchema)

export type OrganisationProps = {
  organisation: OrganisationType
}

export const withLoadOrganisationFromUrl = (Component: React.ComponentType<OrganisationProps>) => {
  return () => {
    const { query: { organisationId }} = useRouter()

    const { data, loading, error } = useGetOrganisationById(parseInt(organisationId as string))

    if (error) return null
  
    if (loading) return <Loading />
  
    const organisation = data?.az_users_Organisation.pop()

    if (!organisation) return <NotFoundPage />

    return <Component organisation={organisation} />
  }
}