import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiLoadingSpinner,
  EuiFormErrorText,
  EuiDatePicker,
  EuiSelect,
} from '@elastic/eui'

import { useRouter } from 'next/router'
import { Page } from '../utils/Page'
import { DocumentLoader, PhotoLoader } from '../files/FileLoader'
import { fillInitValues } from '../utils'
import { serviceLogSchema, typeServiseOptions } from './utils'
import moment from 'moment'
import { az_sensors_e_service_kind_enum } from 'src/types/graphql-global-types'
import { useAddServiceLog } from 'src/graphql/query/service-log/addServiceLogs'
import { SensorsSelect } from '../measurement/SensorsSelect'
import { useNotification } from '../utils/Notifications'

type NewLogProps = {
  sensorId?: number,
  serviceKind?: az_sensors_e_service_kind_enum,
  onChange?: (sensorId: number) => void
}

export const NewLog = ({ sensorId: initialSensorId, serviceKind, onChange }: NewLogProps) => {
  const [ addNewLog ] = useAddServiceLog()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')
  const router = useRouter()

  const { register, handleSubmit, setValue, errors, control, watch } = useForm({
    resolver: yupResolver(serviceLogSchema)
  })

  const sensorId = initialSensorId 
  const timestamp = watch('timestamp') || moment()

  useEffect(() => {
    fillInitValues({ serviceKind, sensorId: initialSensorId, timestamp }, setValue)
  }, [])

  const { addToast } = useNotification()
  // const uninstallTime = watch('uninstallTime')

  const onSubmit = useCallback(async (servicesData) => {
    setLoading(true)
    try {
      const { errors } = await addNewLog({ variables: {
        sensorId: initialSensorId,
        ...servicesData,
        timestamp: timestamp.toISOString()
      }})

      if (errors) throw errors

      setLoading(false)
      await addToast({ 
        title: 'Запис успішно доданий',
        color: 'success'
      })

      onChange
        ? onChange(sensorId)
        : router.back()

    } catch (error) {
      console.error(error)
      setError(error.toString())
      setLoading(false)
    }
  }, [ /* addNewLog */ ])

  const SubmitButton = useCallback(() => loading
    ? <EuiLoadingSpinner size='m' />
    : <EuiButton type="submit" fill>
        Додати запис
    </EuiButton>
  , [ loading ])

  return (
    <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>

      {!initialSensorId && <EuiFormRow label='* ID сенсора' fullWidth>
        <SensorsSelect
          name='sensorId'
          inputRef={register}
          defaultValue={undefined}
          placeholder='Id сенсора'
          fullWidth
          required
        />
      </EuiFormRow>}
      
      <EuiFormRow label="* Тип сервісу" fullWidth>
        <EuiSelect
          name='serviceKind'
          placeholder="Оберіть тип сервісу"
          inputRef={register}
          options={typeServiseOptions}
          disabled={!!serviceKind}
          fullWidth
        />
      </EuiFormRow>

      <EuiFormRow label="* Час закінчення робіт" fullWidth>
        <Controller
          name="timestamp"
          control={control}
          render={({ onChange, value}) =>
            <EuiDatePicker showTimeSelect selected={value ? moment(value) : undefined} onChange={onChange} fullWidth />
          } // props contains: onChange, onBlur and value
        />
      </EuiFormRow>

      <EuiFormRow label="Документи про проведені роботи" fullWidth>
        <Controller
          name="documentIds"
          control={control}
          render={props =>
            <DocumentLoader onChange={props.onChange} />
          } // props contains: onChange, onBlur and value
        />
      </EuiFormRow>

      <EuiFormRow label="Серія фото датчика" fullWidth>
        <Controller
          name="photoIds"
          control={control}
          render={props =>
            <PhotoLoader onChange={props.onChange} />
          } // props contains: onChange, onBlur and value
        />
      </EuiFormRow>

      <EuiSpacer />
      <SubmitButton />
      <EuiFormErrorText>{error}</EuiFormErrorText>

    </EuiForm>

  )
}

export default () => <Page title={'Додати новий запис для датчика'}><NewLog /></Page>
