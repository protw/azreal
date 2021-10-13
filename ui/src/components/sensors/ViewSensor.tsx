import { EuiBadge, EuiDescriptionList, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { MapContainer, Marker, Popup } from 'react-leaflet'
import { OnlyManagerAccess } from '../auth/AuthContext'
import { createDescItem } from '../utils'
import { parseLatLngTuple, titleLayer } from '../utils/Map'
import { Page } from '../utils/Page'
import { DeleteButton } from './DeleteButton'
import { EditButton } from './EditSensor'
import { SensorTabs } from './SensorDetailsTabs'
import { getSensorStatus, SensorProps, withLoadSensorFromUrl } from './utils'

const SensorDesc = ({
  sensor
}: SensorProps) => {
  const {
    manufacturer,
    model,
    isActive,
    sideNumber,
    Location: {
      address,
      airlyLink
    }
  } = sensor

  const items = [
    createDescItem('Бортовий номер датчика', sideNumber),
    createDescItem('Статус', getSensorStatus(isActive)),
    createDescItem('Виробник', manufacturer),
    createDescItem('Модель', model),
    createDescItem('Адреса', <a href={airlyLink}>{address}</a>),
    createDescItem('Фактори вимірювання', sensor.SensorFactors.length && <FactorsDesc sensor={sensor} />),
  ].filter(x => x !== undefined)

  return <EuiDescriptionList textStyle="reverse" listItems={items} />
}

const FactorsDesc = ({
  sensor
}: SensorProps) => {
  const factors = sensor.SensorFactors.map(({ PollutionFactor }) => PollutionFactor)
  const items = factors.map(({ label, e_measurement_unit: { description } }, i) => <EuiBadge key={i} color="primary" style={{ marginLeft: 0, marginRight: '4px' }}>{`${label}/${description}`}</EuiBadge>)

  return items.length
    ? <>{items}</>
    : null
}

export const ViewSensor = ({ sensor }: SensorProps) => {
  const { Location: { locationPoint, address }, sensorId } = sensor
  const sensorCoordinaties = parseLatLngTuple(locationPoint)
  return <>
    <EuiFlexGroup>
      <EuiFlexItem>
        <MapContainer center={sensorCoordinaties} style={{ height: '300px'}} zoom={13}>
          {titleLayer}
          <Marker position={sensorCoordinaties}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </EuiFlexItem>
      <EuiFlexItem>
        <SensorDesc sensor={sensor} />
      </EuiFlexItem>
    </EuiFlexGroup>
    <SensorTabs sensorId={sensorId} />
  </>
}

export const Sensor = ({ sensor }: SensorProps) => {
  return <Page title={<EuiFlexGrid columns={2} >
    <EuiFlexItem>{`Датчик ${sensor.sensorId}`}</EuiFlexItem>
    <OnlyManagerAccess>
      <EuiFlexGroup alignItems='center'>
        <EuiFlexItem>
          <EditButton sensor={sensor} />
        </EuiFlexItem>
        <EuiFlexItem>
          <DeleteButton sensorId={sensor.sensorId} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </OnlyManagerAccess>
  </EuiFlexGrid>
  }>
    <ViewSensor sensor={sensor} />
  </Page>
}

export default withLoadSensorFromUrl(Sensor)