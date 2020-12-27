import dynamic from 'next/dynamic'
import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
const NewSensor = dynamic(import('../../components/sensors/NewSensor'), { ssr: false })

export default () => <OnlyManagerPage>
  <NewSensor />
</OnlyManagerPage>