import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
import { NewOrganisation } from 'src/components/organisation/EditOrganisation'

export default () => <OnlyManagerPage>
  <NewOrganisation />
</OnlyManagerPage>