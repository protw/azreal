import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
import { Organisations } from 'src/components/organisation/Organisations'

export default () => <OnlyManagerPage>
  <Organisations />
</OnlyManagerPage>