import { EuiDataGridColumn } from '@elastic/eui'
import Link from 'next/link'
import React from 'react'
import { useGetUsers } from 'src/graphql/query/users/getUsers'
import { GetUsers_az_users_Users as UsersType } from 'src/graphql/query/users/types/GetUsers'
import { DataGrid } from '../utils/DataGrid'
import { Loading } from '../utils/loading'
import { Page } from '../utils/Page'
import { NotFound } from '../utils/NotFoundPage'
import { OrganisationLink } from './utils'

type ViewUsersProps = {
  users: UsersType[]
}

type UserColumn = Omit<EuiDataGridColumn, 'id'> & {
  id: keyof UsersType
}

const ViewUsers = ({ users }: ViewUsersProps) => {
  const columns: UserColumn[] = [ {
    id: 'fullName',
    display: 'ПІБ',
    displayAsText: 'ПІБ'
  },
  {
    id: 'email',
    display: 'Email',
    displayAsText: 'Email'
  },
  {
    id: 'phoneNumber',
    display: 'Номер телефону',
    displayAsText: 'Номер телефону'
  },
  {
    id: 'userRole',
    display: 'Рівень доступу',
    displayAsText: 'Рівень доступу'
  },
  {
    id: 'Organisation',
    display: 'Організація',
    displayAsText: 'Організація'
  }
  ]

  const data = users.map(({ 
    fullName,
    email,
    userId,
    phoneNumber,
    userRole,
    Organisation
  }) => ({
    fullName: <Link href='/users/[sensorId]' as={`/users/${userId}`}><a>{fullName}</a></Link>,
    email,
    phoneNumber,
    Organisation: <OrganisationLink organisation={Organisation as any} />,
    userRole
  }))

  return <DataGrid columns={columns} data={data} />
}

export const Users = () => {
  const { data, loading, error } = useGetUsers()

  if (error) return null

  if (loading) return <Loading />

  const users = data.az_users_Users

  if (!users.length) return <NotFound message='Немає користувачів'/>

  return <Page
    title='Користувачі'
  >
    <ViewUsers users={users} />
  </Page>
}

export default Users