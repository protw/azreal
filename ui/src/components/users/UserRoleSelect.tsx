import { EuiSelect, EuiSelectProps } from '@elastic/eui'
import React from 'react'

const options = [
  { value: 'user', text: 'Користувач' },
  { value: 'manager', text: 'Адміністратор (додавання датчиків, введеня журналу)' },
]

export const UserRoleSelect = (props: EuiSelectProps) => {
  return <EuiSelect
    id="role-selector"
    fullWidth
    options={options}
    {...props}
  />
}