import { EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { OnlyManagerAccess } from '../auth/AuthContext'
import { ButtonLink } from './ButtonLink'

type EditButtonProps = {
  typeEdit: 'organisations' | 'sensors' | 'users' | 'profile',
  id?: number
}
// eslint-disable-next-line react/react-in-jsx-scope
export const EditButton = ({ id, typeEdit }: EditButtonProps) => <ButtonLink
  href={`/${typeEdit}${id ? `/${id}` : ''}/edit`}
  iconType='documentEdit'
  fullWidth
  size='s'>
    Редагувати
</ButtonLink>

type NewButtonProps = {
  url: string
}

export const NewButton = ({ url }: NewButtonProps) => <OnlyManagerAccess>
  <EuiFlexItem>
    <ButtonLink
      href={url}
      style={{ float: 'right' }}
      iconType='createSingleMetricJob'
      size='s'>
        Додати
    </ButtonLink>
  </EuiFlexItem>
</OnlyManagerAccess>