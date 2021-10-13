import { EuiButton, EuiDescriptionList, EuiFlexGrid, EuiFlexItem } from '@elastic/eui'
import { isMobile } from 'mobile-device-detect'
import Link from 'next/link'
import React from 'react'
import { MapContainer, Marker, Popup } from 'react-leaflet'
import { GetSensors_az_sensors_Sensors as SensorsType } from 'src/graphql/query/sensors/types/GetSensors'
import { createDescItem } from '../utils'
import { KYIV_COORDINATES, parseLatLngTuple, titleLayer } from '../utils/Map'

type LocationsProps = {
  sensors: SensorsType[]
}

type LocationProps = {
  sensor: SensorsType
}

const LocationDesc = ({
  sensor: {
    Location: {
      address,
      elevation,
      locationId,
      airlyLink
    }
  }
}: LocationProps) => {
  const items = [
    createDescItem('ID локації', locationId),
    createDescItem('Адреса', address),
    createDescItem('Висота над рівнем моря', `${elevation} м`),
    createDescItem('Посилання на Airly', airlyLink)
  ].filter(x => x !== undefined)

  return <EuiDescriptionList textStyle="reverse" listItems={items} />
}

const LocationMarker = ({ 
  sensor
}: LocationProps) => <Marker
  position={parseLatLngTuple(sensor.Location.locationPoint)}
>
  <Popup>
    <EuiFlexGrid columns={1} direction="column">
      <EuiFlexItem>
        <LocationDesc sensor={sensor} />
      </EuiFlexItem>

      <EuiFlexItem >
        <Link href='/sensors/[sensorId]' as={`/sensors/${sensor.sensorId}`}>
          <a>
            <EuiButton size="s" iconType="link" fullWidth >
                Сторінка локації
            </EuiButton>
          </a>
        </Link>
      </EuiFlexItem>
    </EuiFlexGrid>
  </Popup>
</Marker>

export const SensorsMaps = ({ sensors }: LocationsProps) => {
  return <MapContainer center={KYIV_COORDINATES} zoom={12} style={{ height: isMobile ? '300px' : '600px' }}>
    {titleLayer}
    {sensors.map((x, i) => <LocationMarker key={i} sensor={x} />)}
  </MapContainer>
}