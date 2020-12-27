import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { sha256 } from 'crypto-hash'

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiLoadingSpinner,
  EuiFormErrorText,
  EuiFieldPassword,
  EuiButtonEmpty,
  EuiFlexItem,
  EuiCopy,
  EuiButtonIcon,
  EuiFlexGrid,
} from '@elastic/eui'

import { useRouter } from 'next/router'
import { Page } from '../utils/Page'
import { getFiledName, UserProps, userSchema, withLoadMyUser, withLoadUserFromUrl } from './utils'
import { fillInitValues, getErrorMsg } from '../utils'
import { EditButton } from '../utils/EditButton'
import { useUpsetUser } from 'src/graphql/query/users/upsetUser'
import { UserRoleSelect } from './UserRoleSelect'
import { OrganisationSelect } from './OrganisationSelect'
import generatePassword from 'password-generator'
import { useNotification } from '../utils/Notifications'
import { useAuthObj, useIsIAm, useIsManagerAccess } from '../auth/AuthContext'
import { Loading } from '../utils/loading'

type UserForm = Partial<UserProps>

const messages = {
  new: {
    title: 'Додати користувача',
  },
  edit: {
    title: 'Редагувати дані користувача'
  }
}

export const InnerEditUser = ({ user }: UserForm) => {
  const formType = user ? 'edit' : 'new'
  const isNew = formType === 'new'
  const [ upsetUsers ] = useUpsetUser(user?.userId)
  const [ loading, setLoading ] = useState(false)
  const router = useRouter()
  const { addToast } = useNotification()
  const isManager = useIsManagerAccess()
  const [ error, setError ] = useState<string>()
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(userSchema)
  })

  useEffect(() => {
    if (isNew) {
      setValue(getFiledName('password'), generatePassword(12, false))
    } else {
      fillInitValues(user, setValue)
    }
  })

  const onSubmit = useCallback(async userData => {
    setError(undefined)
    setLoading(true)
    try {
      const password = userData.password
        ? await (await sha256(userData.password)).toString()
        : undefined

      const { errors } = await upsetUsers({ variables: {
        ...userData,
        password
      }})

      if (errors) throw errors
  
      setLoading(false)
      isNew && await addToast({ 
        title: 'Незабудьте пароль!',
        color: 'success',
        text: <EuiFlexGrid columns={1}>
          <EuiFlexItem>
            Цей пароль потрібний для входу у систему для створеного користувача, не забудьте передати його!
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldPassword type='dual' value={userData.password} readOnly fullWidth />
            <EuiCopy textToCopy={userData.password}>
              {(copy) => (
                <EuiButtonIcon iconType='copy' onClick={copy} />
              )}
            </EuiCopy>
          </EuiFlexItem>
        </EuiFlexGrid>
          
      })
      router.push('/users/[userId]', `/users/${user.userId}`)
    } catch (error) {
      console.error(error)
      setError(error?.toString())
      setLoading(false)
    }
  }, [ upsetUsers ])

  const SubmitButton = useCallback(() => loading
    ? <EuiLoadingSpinner size='m' />
    : <EuiButton type="submit" fill>
      {messages[formType].title}
    </EuiButton>
  , [ loading ])

  const PasswordInput = useCallback(() => isNew ? <>
    <EuiFormRow label="* Пароль користувача" fullWidth>
      <EuiFieldPassword name={getFiledName('password')} required type='dual' inputRef={register} fullWidth />
    </EuiFormRow>
    <EuiFormErrorText>{getErrorMsg(errors[getFiledName('password')])}</EuiFormErrorText>
  </> : <EuiButtonEmpty href='/password-change'>Змінити пароль</EuiButtonEmpty>, [ isNew ])

  if (!isNew && loading) return <Loading />

  return (
    <Page title={messages[formType].title}>
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow label="* Прізвище ім'я по-батькові"fullWidth>
          <EuiFieldText name={getFiledName('fullName')} inputRef={register} required fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors[getFiledName('fullName')])}</EuiFormErrorText>

        <EuiFormRow label="* Email" fullWidth>
          <EuiFieldText name={getFiledName('email')} inputRef={register} required fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors[getFiledName('email')])}</EuiFormErrorText>

        <EuiFormRow label="Номер телефону" fullWidth>
          <EuiFieldText
            name={getFiledName('phoneNumber')}
            placeholder="+380(00)0000000"
            inputRef={register}
            fullWidth
          />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors[getFiledName('phoneNumber')])}</EuiFormErrorText>

        <EuiFormRow label="* Рівень доступу користувача" fullWidth>
          <UserRoleSelect disabled={!isManager} name={getFiledName('userRole')} required inputRef={register} fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors[getFiledName('userRole')])}</EuiFormErrorText>

        <EuiFormRow label="* Організація" fullWidth>
          <OrganisationSelect disabled={!isManager} required name={getFiledName('organisationId')} inputRef={register} fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors[getFiledName('organisationId')])}</EuiFormErrorText>

        <PasswordInput />

        <EuiSpacer size='m' />
        <SubmitButton />

        <EuiFormErrorText>{error}</EuiFormErrorText>

      </EuiForm>
    </Page>

  )
}

export const NewUser = InnerEditUser
export const EditUser = withLoadUserFromUrl(InnerEditUser)
export const EditMyUser = withLoadMyUser(InnerEditUser)
export const EditUserButton = ({ user: { userId } }: UserProps) => {
  const isMyUser = useIsIAm(userId)

  return <EditButton
    id={isMyUser ? undefined : userId}
    typeEdit={isMyUser ? 'profile' : 'users'}
  />
}