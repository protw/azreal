import { EuiDataGridColumn, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import Link from 'next/link'
import React from 'react'
import { useGetOrganisations } from 'src/graphql/query/organisations/getOrganisations'
import { GetOrganisations_az_users_Organisation as OrganisationsType } from 'src/graphql/query/organisations/types/GetOrganisations'
import { DataGrid } from '../utils/DataGrid'
import { Loading } from '../utils/loading'
import { Page } from '../utils/Page'
import { NotFound } from '../utils/NotFoundPage'
import { NewButton } from '../utils/EditButton'

type ViewOrganisationsProps = {
  organisations: OrganisationsType[]
}

type OrganisationColumn = Omit<EuiDataGridColumn, 'id'> & {
  id: keyof OrganisationsType
}

const ViewOrganisations = ({ organisations }: ViewOrganisationsProps) => {
  const columns: OrganisationColumn[] = [ {
    id: 'fullName',
    display: 'Назва організації',
    displayAsText: 'Назва організації'
  },
  {
    id: 'shortName',
    display: 'Коротка назва',
    displayAsText: 'Коротка назва'
  },
  {
    id: 'country',
    display: 'Країна',
    displayAsText: 'Країна'
  },
  {
    id: 'rntrc',
    display: 'Код платника податків',
    displayAsText: 'Код платника податків'
  } ]

  const data = organisations.map(({ organisationId, organisationRole, country, shortName, fullName, rntrc }) => ({
    fullName: <Link href='/organisations/[sensorId]' as={`/organisations/${organisationId}`}><a>{fullName}</a></Link>,
    shortName,
    organisationRole,
    rntrc,
    country
  }))

  return <DataGrid columns={columns} data={data} />
}

export const Organisations = () => {
  const { data, loading, error } = useGetOrganisations()

  if (error) return null

  if (loading) return <Loading />

  const organisations = data.az_users_Organisation

  if (!organisations.length) return <NotFound message='Не вдалось знайти жоної організації'/>

  return <Page
    title={
      <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
        <EuiFlexItem>
          {'Організації'}
        </EuiFlexItem>
        <NewButton url='/organizations/new' />
      </EuiFlexGroup>
    }
  >
    <ViewOrganisations organisations={organisations} />
  </Page>
}

export default Organisations