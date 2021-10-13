import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
import { Users } from 'src/components/users/Users'

export default () => <OnlyManagerPage>
  <Users />
</OnlyManagerPage>