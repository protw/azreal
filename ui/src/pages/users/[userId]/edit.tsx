import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
import { EditUser } from 'src/components/users/EditUser'

export default () => <OnlyManagerPage>
  <EditUser />
</OnlyManagerPage>