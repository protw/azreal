import { EuiDescriptionList, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { Files } from '../files/Files'
import { Images } from '../files/Images'
import { createDescItem } from '../utils'
import { Page } from '../utils/Page'
import { DeleteButton } from './DeleteButton'
import { EditOrganisationButton } from './EditOrganisation'
import { OrganisationProps, withLoadOrganisationFromUrl } from './utils'

const OrganisationDesc = ({
  organisation
}: OrganisationProps) => {
  const {
    shortName,
    rntrc,
    organisationRole,
  } = organisation

  const items = [
    createDescItem('Коротка назва', shortName),
    createDescItem('Єдиний номер платника податку', rntrc),
    createDescItem('Опис ролі організації', organisationRole),
  ].filter(x => x !== undefined)

  return <EuiDescriptionList textStyle="reverse" listItems={items} />
}

export const ViewOrganisation = ({ organisation }: OrganisationProps) => {
  return <EuiFlexGroup>
    <EuiFlexItem>
      <OrganisationDesc organisation={organisation} />
    </EuiFlexItem>
    <EuiFlexItem>
      <Images fileIds={organisation.Document.fileIds} />
    </EuiFlexItem>
  </EuiFlexGroup>
}


export const Organisation = ({ organisation }: OrganisationProps) => {
  return <Page title={<EuiFlexGrid columns={2}>
    <EuiFlexItem>{organisation.fullName}</EuiFlexItem>
    <EuiFlexGroup alignItems='center'>
      <EuiFlexItem>
        <EditOrganisationButton organisation={organisation} />
      </EuiFlexItem>
      <EuiFlexItem>
        <DeleteButton organisationId={organisation.organisationId} fileIds={organisation.Document.fileIds} />
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiFlexGrid>
  }>
    <ViewOrganisation organisation={organisation} />
  </Page>
}

export default withLoadOrganisationFromUrl(Organisation)