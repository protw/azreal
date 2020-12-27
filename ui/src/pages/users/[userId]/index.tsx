import React from 'react'
import { OnlyManagerPage } from 'src/components/auth/AuthContext'
import { User } from 'src/components/users/User'

export default () => <OnlyManagerPage>
  <User />
</OnlyManagerPage>