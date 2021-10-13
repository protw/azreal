import React from 'react'

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPage,
  EuiImage,
  EuiFlexGrid,
} from '@elastic/eui'
import { useRouter } from 'next/router'
import uiMsg from 'src/i18/ua_msg'
import { isMobile } from 'mobile-device-detect'

export const HomePage = () => {
  const router = useRouter()

  return <EuiPage restrictWidth style={{ marginTop: '2rem' }}>
    <EuiFlexGroup direction="row" justifyContent='center' alignItems='center' style={{ marginRight: '1rem' }} >
      <EuiFlexItem grow={false} style={{ margin: '1.5rem' }} >
        <EuiImage
          style={{ margin: 'auto' }}
          size={'l'}
          hasShadow
          alt="airzoom logo"
          url="/images/airzoom.svg"
        />
      </EuiFlexItem>
      <EuiFlexGrid columns={2} >
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xl" type={'watchesApp'} />}
            title={uiMsg.sensors.info.title}
            description={uiMsg.sensors.info.desc}
            onClick={() => router.push(uiMsg.sensors.path)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xl" type={'visualizeApp'} />}
            title={uiMsg.measurements.info.title}
            description={uiMsg.measurements.info.desc}
            onClick={() => router.push(uiMsg.measurements.path)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xl" type={'logsApp'} />}
            title={uiMsg.serviceLog.info.title}
            description={uiMsg.serviceLog.info.desc}
            onClick={() => router.push(uiMsg.serviceLog.path)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xl" type={'notebookApp'} />}
            title={uiMsg.docs.info.title}
            description={uiMsg.docs.info.desc}
            onClick={() => router.push(uiMsg.docs.path)}
          />
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiFlexGroup>
  </EuiPage>
}