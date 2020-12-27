import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
import { EditOrganisation } from 'src/components/organisation/EditOrganisation'

export default () => <OnlyManagerPage>
  <EditOrganisation />
</OnlyManagerPage>