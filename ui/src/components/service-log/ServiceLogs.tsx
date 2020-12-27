import { EuiDescriptionList, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer } from '@elastic/eui'
import React, { useState } from 'react'
import { GetServiceLogs_az_sensors_ServiceLog } from 'src/graphql/query/service-log/types/GetServiceLogs'
import uiMsg from 'src/i18/ua_msg'
import { Files } from '../files/Files'
import { Images } from '../files/Images'
import { getAggregationTime } from '../measurement/utils'
import { createDescItem } from '../utils'
import { NewButton } from '../utils/EditButton'
import { Page } from '../utils/Page'
import { DeleteButton } from './DeleteButton'
import { ServiceLogSelector } from './ServiceLogSelector'
import { messageByServiceKind } from './utils'

const ServiceLogDesc = ({
  sensorId,
  serviceKind,
  timestamp,
  Sensor: {
    Location: {
      address,
      airlyLink
    }
  }
}: GetServiceLogs_az_sensors_ServiceLog) => {
  const items = [
    createDescItem('Сенсор', sensorId),
    createDescItem('Тип', messageByServiceKind[serviceKind]),
    createDescItem('Адреса', <a href={airlyLink}>{address}</a>),
    createDescItem('Час робіт', getAggregationTime(timestamp)),
  ].filter(x => x !== undefined)

  return <EuiDescriptionList textStyle="reverse" listItems={items} />
}

const ServiceLog = (serviceLog: GetServiceLogs_az_sensors_ServiceLog) => {
  return <EuiPanel paddingSize="l" style={{ marginTop: '1rem' }}>
    <EuiFlexGroup alignItems='flexStart'>
      <EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem> 
            <Images fileIds={serviceLog.Photo.fileIds} />
          </EuiFlexItem>
          <EuiFlexItem> 
            <Images fileIds={serviceLog.Document.fileIds} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <ServiceLogDesc {...serviceLog} />
      </EuiFlexItem>
      <DeleteButton serviceLog={serviceLog} />
    </EuiFlexGroup>
  </EuiPanel>
}

type ServicLogsProps = {
  data: GetServiceLogs_az_sensors_ServiceLog[]
}

export const ServiceLogs = ({ data }: ServicLogsProps) => <EuiFlexItem>
  {data?.map(ServiceLog)}
</EuiFlexItem>

type ServiceLogsSectionProps = {
  sensorId: number
}

export const ServiceLogsSection = ({ sensorId }: Partial<ServiceLogsSectionProps>) => {
  const [ data, setData ] = useState<GetServiceLogs_az_sensors_ServiceLog[]>([])
  return <>
    <EuiSpacer size='l' />
    <ServiceLogSelector onChange={(data) => setData(data)} sensorId={sensorId} />
    <EuiSpacer size='l' />
    <ServiceLogs data={data} />
  </>
}

export const ServiceLogsSectionForSensor = (props: ServiceLogsSectionProps) =>
  <ServiceLogsSection {...props} />

export default () => {
  return <Page
    title={
      <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
        <EuiFlexItem>
          {'Сервісний журнал'}
        </EuiFlexItem>
        <NewButton url='/service/new' />
      </EuiFlexGroup>
    }
    desc={uiMsg.serviceLog.desc}
  >
    <ServiceLogsSection />
  </Page>
}
  