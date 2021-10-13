import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
import { NewUser } from 'src/components/users/EditUser'

export default () => <OnlyManagerPage>
  <NewUser />
</OnlyManagerPage>