import { EuiOverlayMask, EuiLoadingChart } from '@elastic/eui'
import React from 'react'

export const Loading = () => <EuiOverlayMask>
  <EuiLoadingChart size="xl" />
</EuiOverlayMask>