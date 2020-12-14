import { EuiButton, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormErrorText, EuiFormRow, EuiImage, EuiLoadingSpinner, EuiSpacer } from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { getErrorMsg } from '../utils'
import CenteredPage from '../utils/CenteredPage'
import { checkLogin } from './login'
import { useAuth } from './AuthContext'
import uiMsg from 'src/i18/ua_msg'

export const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

export const Login = () => {
  const { setAuthObj } = useAuth()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async ({ email, password }) => {
    setLoading(true)
    try {

      const { data, error } = await checkLogin(email, password)
  
      if (error) throw error

      if (data) {
        setAuthObj(data)
        setLoading(false)
      }

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
          Увійти
        </EuiButton>
      ),
    [ loading ]
  )

  return (
    <EuiForm component='form' onSubmit={handleSubmit(onSubmit)}>

      <EuiFormRow label={uiMsg.form.email} style={{ padding: '.5rem 0'}} fullWidth>
        <EuiFieldText name={'email'} inputRef={register} fullWidth />
      </EuiFormRow>
      <EuiFormErrorText>{getErrorMsg(errors['email'])}</EuiFormErrorText> 

      <EuiFormRow label={uiMsg.form.password} style={{ padding: '.5rem 0'}} fullWidth>
        <EuiFieldPassword name={'password'} inputRef={register} fullWidth type='dual' />
      </EuiFormRow>
      <EuiFormErrorText>{getErrorMsg(errors['password'])}</EuiFormErrorText>
      
      <EuiFormErrorText>{error}</EuiFormErrorText>

      <SubmitButton />
    </EuiForm>
  )
}

export const LoginPage = () => {
  return <CenteredPage title={uiMsg.auth.logIn}>
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
        <Login />
      </EuiFlexItem>
    </EuiFlexGroup>
  </CenteredPage>
}