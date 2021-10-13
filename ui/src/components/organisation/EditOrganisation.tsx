import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiFieldNumber,
  EuiLoadingSpinner,
  EuiFormErrorText,
} from '@elastic/eui'

import { useRouter } from 'next/router'
import { Page } from '../utils/Page'
import { OrganisationProps, OrganisationSchema, organisationSchema, withLoadOrganisationFromUrl } from './utils'
import { DocumentLoader, PhotoLoader } from '../files/FileLoader'
import { createHasuraArray, fillInitValues, getErrorMsg } from '../utils'
import { EditButton } from '../utils/EditButton'
import { AddOrganization } from 'src/graphql/query/organisations/types/AddOrganization'
import { useUpsetOrganisation } from 'src/graphql/query/organisations/upsertOrganisation'

type OrganisationForm = Partial<OrganisationProps>

const messages = {
  new: {
    title: 'Додати організацію',
  },
  edit: {
    title: 'Редагувати дані організації'
  }
}

export const InnerEditOrganisation = ({ organisation }: OrganisationForm) => {
  const formType = organisation ? 'edit' : 'new'
  const isNew = formType === 'new'
  const [ upsetOrganisations ] = useUpsetOrganisation(organisation?.organisationId)
  const [ loading, setLoading ] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, errors, control, setValue } = useForm<OrganisationSchema>({
    resolver: yupResolver(organisationSchema)
  })

  useEffect(() => {
    if (isNew) return

    fillInitValues({
      ...organisation,
    }, setValue)
  }, [])

  const onSubmit = useCallback(async (organisationData: OrganisationSchema) => {
    setLoading(true)
    try {
      const { errors, data } = await upsetOrganisations({ variables: {
        ...organisationData,
        rntrc: organisationData.rntrc?.toString()
        // documentIds
      }})

      if (errors) throw errors
  
      setLoading(false)
      const organisationId = (data as AddOrganization)?.insert_az_users_Organisation_one.organisationId || organisation.organisationId
      router.push(`/organisations/${organisationId}`)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [ upsetOrganisations ])

  const SubmitButton = useCallback(() => loading
    ? <EuiLoadingSpinner size='m' />
    : <EuiButton type="submit" fill>
      {messages[formType].title}
    </EuiButton>
  , [ loading ])

  return (
    <Page title={messages[formType].title}>
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow label="* Повна назва організації"fullWidth>
          <EuiFieldText name="fullName" inputRef={register} required fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.fullName)}</EuiFormErrorText>

        <EuiFormRow label="* Коротка назва" fullWidth>
          <EuiFieldText name="shortName" inputRef={register} required fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.shortName)}</EuiFormErrorText>

        <EuiFormRow label="* Країна" fullWidth>
          <EuiFieldText name="country" inputRef={register} required fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.country)}</EuiFormErrorText>

        <EuiFormRow label="Роль організації" fullWidth>
          <EuiFieldText name="organisationRole" inputRef={register} fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.organisationRole)}</EuiFormErrorText>

        <EuiFormRow label="* Єдиний номер платника податку" fullWidth>
          <EuiFieldNumber
            name='rntrc'
            placeholder="00000000"
            inputRef={register}
            fullWidth
            required
          />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.rntrc)}</EuiFormErrorText>

        {isNew && <EuiFormRow label="Файли організації" fullWidth>
          <Controller
            name="documentIds"
            control={control}
            render={props =>
              <PhotoLoader fileIds={props.value} onChange={props.onChange} />
            } // props contains: onChange, onBlur and value
          />
        </EuiFormRow>}

        <EuiSpacer />
        <SubmitButton />

      </EuiForm>
    </Page>

  )
}

export const NewOrganisation = InnerEditOrganisation
export const EditOrganisation = withLoadOrganisationFromUrl(InnerEditOrganisation)
export const EditOrganisationButton = ({ organisation: { organisationId } }: OrganisationProps) => <EditButton id={organisationId} typeEdit='organisations' />