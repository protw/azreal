import React from 'react'

import {
  EuiTabbedContent,
} from '@elastic/eui'
import { MeasurementsForSensor } from '../measurement/Measurement'
import { ServiceLogsSectionForSensor } from '../service-log/ServiceLogs'

type SensorTabsProps = {
  sensorId: number
}

export const SensorTabs = ({ sensorId }: SensorTabsProps) => {
  const tabs = [
    {
      id: 'measurements--id',
      name: 'Вимірювання',
      content: <MeasurementsForSensor sensorId={sensorId} />,
    },
    {
      id: 'service-logs--id',
      name: 'Сервісний журнал',
      content: <ServiceLogsSectionForSensor sensorId={sensorId} />
    }
  ]

  return (
    <EuiTabbedContent
      style={{ marginTop: '1rem' }}
      tabs={tabs}
      initialSelectedTab={tabs[1]}
    />
  )
}