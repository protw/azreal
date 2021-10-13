import { EuiDescriptionList, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useIsManagerAccess } from '../auth/AuthContext'
import { createDescItem } from '../utils'
import { Page } from '../utils/Page'
import { DeleteButton } from './DeleteButton'
import { EditUserButton } from './EditUser'
import { OrganisationLink, UserProps, withLoadMyUser, withLoadUserFromUrl } from './utils'

const UserDesc = ({
  user
}: UserProps) => {
  const {
    fullName,
    email,
    phoneNumber,
    Organisation
  } = user

  const items = [
    createDescItem('ПІБ', fullName),
    createDescItem('Email', email),
    createDescItem('Номер телефону', phoneNumber),
    createDescItem('Організація', <OrganisationLink organisation={Organisation as any} />)
  ].filter(x => x !== undefined)

  return <EuiDescriptionList textStyle="reverse" listItems={items} />
}

export const ViewUser = ({ user }: UserProps) => {
  return <EuiFlexGroup>
    <EuiFlexItem>
      <UserDesc user={user} />
    </EuiFlexItem>
    <EuiFlexItem>
    </EuiFlexItem>
  </EuiFlexGroup>
}


export const UserPage = ({ user }: UserProps) => {
  const isManager = useIsManagerAccess()
  return <Page title={<EuiFlexGrid columns={2}>
    <EuiFlexItem>{user.fullName}</EuiFlexItem>
    <EuiFlexGroup alignItems='center'>
      <EuiFlexItem>
        <EditUserButton user={user} />
      </EuiFlexItem>
      {isManager && <EuiFlexItem>
        <DeleteButton userId={user.userId} />
      </EuiFlexItem>}
    </EuiFlexGroup>
  </EuiFlexGrid>
  }>
    <ViewUser user={user} />
  </Page>
}

export const User = withLoadUserFromUrl(UserPage)
export const MyUser = withLoadMyUser(UserPage)