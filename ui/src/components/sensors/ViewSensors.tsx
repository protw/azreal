import { EuiDataGridColumn, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui'
import Link from 'next/link'
import React from 'react'
import { useGetSensors } from 'src/graphql/query/sensors/getSensors'
import { GetSensors_az_sensors_Sensors as SensorsType } from 'src/graphql/query/sensors/types/GetSensors'
import { SensorsMaps } from './Maps'
import { DataGrid } from '../utils/DataGrid'
import { Loading } from '../utils/loading'
import { Page } from '../utils/Page'
import { NotFound } from '../utils/NotFoundPage'
import { getSensorStatus } from './utils'
import { NewButton } from '../utils/EditButton'

type ViewSensorsProps = {
  sensors: SensorsType[]
}

const ViewSensors = ({ sensors }: ViewSensorsProps) => {
  const columns: EuiDataGridColumn[] = [ {
    id: 'sensorId',
    display: 'Airly Id датчика',
    displayAsText: 'Airly Id',
    initialWidth: 100
  },
  {
    id: 'sideNumber',
    display: 'Бортовий номер',
    displayAsText: 'Бортовий номер',
    initialWidth: 100
  },
  {
    id: 'model',
    display: 'Модель',
    displayAsText: 'Модель'
  },
  {
    id: 'manufacturer',
    display: 'Виробник',
    displayAsText: 'Виробник'
  },
  {
    id: 'address',
    display: 'Розташування',
    displayAsText: 'Розташування'
  },
  {
    id: 'status',
    display: 'Статус',
    displayAsText: 'Статус'
  } ]

  const data = sensors.map(({ Location: { address, airlyLink }, sensorId, isActive, manufacturer, sideNumber, model }) => ({
    sensorId: <Link href='/sensors/[sensorId]' as={`/sensors/${sensorId}`}><a>{sensorId}</a></Link>,
    manufacturer,
    model,
    sideNumber,
    address: <a href={airlyLink}>{address}</a>,
    status: getSensorStatus(isActive)
  }))

  return <DataGrid columns={columns} data={data} />
}

export const Sensors = () => {
  const { data, loading, error } = useGetSensors()

  if (error) return null

  if (loading) return <Loading />

  const sensors = data.az_sensors_Sensors

  if (!sensors.length) return <NotFound message='Не вдалось знайти датчики'/>

  return <Page
    title={
      <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
        <EuiFlexItem>
          {'Датчики'}
        </EuiFlexItem>
        <NewButton url='/sensors/new' />
      </EuiFlexGroup>
    }
  >
    <SensorsMaps sensors={sensors} />

    <EuiSpacer size='xxl' />

    <ViewSensors sensors={sensors} />
  </Page>
}

export default Sensors