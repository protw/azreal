import { EuiButton, EuiFieldPassword, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormErrorText, EuiFormRow, EuiImage, EuiLoadingSpinner, EuiSpacer } from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useChangePassword } from 'src/graphql/query/users/chagePassword'
import { ChangePasswordVariables } from 'src/graphql/query/users/types/ChangePassword'
import * as yup from 'yup'
import { getErrorMsg } from '../utils'
import * as sha256 from 'fast-sha256'
import { useAuthObj } from './AuthContext'
import CenteredPage from '../utils/CenteredPage'
import uiMsg from 'src/i18/ua_msg'

type ChangePasswordKeys = keyof ChangePasswordVariables

type SchemaType = Record<ChangePasswordKeys, any>

export const schema = yup.object().shape({
  password: yup.string().min(8),
  oldpassword: yup.string().min(8),
  userId: yup.number().required()
} as SchemaType)

export const getFiledName = (name: ChangePasswordKeys) => name

export const ChangePassword = () => {
  const [ changePassword ] = useChangePassword()
  const { userId } = useAuthObj()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')
  const router = useRouter()

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async changePasswordData => {
    setLoading(true)
    try {
      const { data, errors } = await changePassword({
        variables: {
          userId,
          password: sha256.hash(changePasswordData.password).toString(),
          oldpassword: sha256.hash(changePasswordData.oldpassword).toString()
        },
      })

      if (errors) throw errors

      if (data?.insert_az_users_AuthData_one.userId) {
        setLoading(false)
        router.back()
      }

      throw new Error(uiMsg.auth.error.fogotOldPassword)
    } catch (error) {
      console.error(error)
      setError(error.toString())
      setLoading(false)
    }
  }

  const SubmitButton = useCallback(
    () =>
      loading ? (
        <EuiLoadingSpinner size='m' />
      ) : (
        <EuiButton type='submit' fill fullWidth>
          Змінити пароль
        </EuiButton>
      ),
    [ loading ]
  )

  return (
    <EuiForm component='form' onSubmit={handleSubmit(onSubmit)}>

      <EuiFormRow label={uiMsg.auth.oldPassword} style={{ padding: '.5rem 0'}} fullWidth>
        <EuiFieldPassword name={getFiledName('oldpassword')} inputRef={register} type='dual' fullWidth />
      </EuiFormRow>
      <EuiFormErrorText>{getErrorMsg(errors[getFiledName('oldpassword')])}</EuiFormErrorText>

      <EuiFormRow label={uiMsg.auth.newPassword} style={{ padding: '.5rem 0'}} fullWidth>
        <EuiFieldPassword name={getFiledName('password')} inputRef={register} type='dual' fullWidth />
      </EuiFormRow>
      <EuiFormErrorText>{getErrorMsg(errors[getFiledName('password')])}</EuiFormErrorText>
      <EuiFormErrorText>{error}</EuiFormErrorText>
      
      <SubmitButton />
    </EuiForm>
  )
}

export const ChangePasswordPage = () => {
  return <CenteredPage title={uiMsg.auth.changePassword}>
    <EuiFlexGroup alignItems='center'>
      <EuiFlexItem grow={false}>
        <EuiImage
          size="m"
          hasShadow
          alt="airzoom logo"
          url="/images/airzoom.svg"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <ChangePassword />
      </EuiFlexItem>
    </EuiFlexGroup>
  </CenteredPage>
}

export default ChangePasswordPage