import { GetUserById_az_users_Users as UserType } from '../../graphql/query/users/types/GetUserById'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetUsersById } from 'src/graphql/query/users/getUserById'
import { NotFoundPage } from '../utils/NotFoundPage'
import { Loading } from '../utils/loading'
import { AddUserVariables } from 'src/graphql/query/users/types/AddUser'
import { useAuthObj } from '../auth/AuthContext'
import { AddPasswordVariables } from 'src/graphql/query/users/types/AddPassword'
import Link from 'next/link'
import { OrganisationProps } from '../organisation/utils'

type UserKeys = keyof UserType | keyof AddUserVariables | keyof AddPasswordVariables
type UserSchema = Record<UserKeys, any>

const yupRequiredStr = yup.string().required()

export const getFiledName = (name: UserKeys) => name

export const userSchema = yup.object().shape({
  email: yupRequiredStr.email(),
  organisationId: yupRequiredStr,
  fullName: yupRequiredStr,
  userRole: yupRequiredStr,
  registryLink: yup.string().url(),
  phoneNumber: yup.string(),
  documentId: yup.number(),
  password: yup.string().min(8)
} as unknown as UserSchema)

export type UserProps = {
  user: UserType
}

export const withLoadUser = (Component: React.ComponentType<UserProps>) => {
  return (userId: number) => {
    const { data, loading, error } = useGetUsersById(userId)

    if (error) return null
  
    if (loading) return <Loading />
  
    const user = data?.az_users_Users.pop()

    if (!user) return <NotFoundPage />

    return <Component user={user} />
  }
}

export const withLoadUserFromUrl = (Component: React.ComponentType<UserProps>) => {
  return () => {
    const { query: { userId }} = useRouter()

    return withLoadUser(Component)(parseInt(userId as string))
  }
}

export const withLoadMyUser = (Component: React.ComponentType<UserProps>) => {
  return () => {
    const { userId } = useAuthObj()

    return withLoadUser(Component)(userId)
  }
}

export const OrganisationLink = ({ organisation}: OrganisationProps) => {
  if (!organisation) return null
  const { organisationId, shortName, fullName } = organisation

  return <Link href='/organisations/[organisationId]' as={`/organisations/${organisationId}`}><a>{shortName || fullName}</a></Link>
}