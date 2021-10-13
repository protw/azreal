import React, { useCallback, useState } from 'react'
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
  EuiDatePicker,
} from '@elastic/eui'

import { loadLocationDataBySensorId, loadSensorFactorBySensorId, sensorSchema } from './utils'
import { useAddSensor } from 'src/graphql/query/sensors/addSensor'
import { useRouter } from 'next/router'
import { Page } from '../utils/Page'
import { DocumentLoader, PhotoLoader } from '../files/FileLoader'
import { getErrorMsg } from '../utils'
import moment from 'moment'

export const NewSensor = () => {
  const [ addSensors ] = useAddSensor()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')
  const router = useRouter()

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(sensorSchema)
  })

  const onSubmit = useCallback(async sensorData => {
    setLoading(true)
    try {
      const sensorId = sensorData.sensorId
      const { location, error: error1 } = await loadLocationDataBySensorId(sensorId)
      const { sensorFactors, error: error2 } = await loadSensorFactorBySensorId(sensorId)
      const error = error1 || error2

      if (error) {
        throw error
      } else if (location) {
        console.log({
          ...location,
          sensorFactors,
          ...sensorData
        })
        const { data, errors } = await addSensors({ variables: {
          ...location,
          sensorFactors,
          ...sensorData
        }})

        if (errors) throw errors

        setLoading(false)
        router.push('/sensors/[sensorId]', `/sensors/${data.insert_az_sensors_Sensors_one.sensorId}`)
      }
    } catch (error) {
      console.error(error)
      setError(error.toString())
      setLoading(false)
    }
  }, [ addSensors ])

  const SubmitButton = useCallback(() => loading
    ? <EuiLoadingSpinner size='m' />
    : <EuiButton type="submit" fill>
        Додати датчик
    </EuiButton>
  , [ loading ])

  return (
    <Page title='Додати датчик'>
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>

        <EuiFormRow label='* Бортовий номер датчика' fullWidth>
          <EuiFieldNumber
            name='sideNumber'
            placeholder='Бортовий номер датчика'
            inputRef={register({ required: true })}
            fullWidth
            required
          />
        </EuiFormRow>

        <EuiFormRow label="* ID сенсора" fullWidth>
          <EuiFieldNumber
            name='sensorId'
            placeholder="ID сенсора з Airly"
            inputRef={register}
            fullWidth
            required
          />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.sensorId)}</EuiFormErrorText>

        <EuiFormRow label="Виробник" fullWidth>
          <EuiFieldText name="manufacturer" inputRef={register} fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.manufacturer)}</EuiFormErrorText>

        <EuiFormRow label="Модель" fullWidth>
          <EuiFieldText name="model" inputRef={register} fullWidth />
        </EuiFormRow>
        <EuiFormErrorText>{getErrorMsg(errors.model)}</EuiFormErrorText>

        <EuiFormRow label="* Час закінчення робіт" fullWidth>
          <Controller
            name="timestamp"
            control={control}
            render={({ onChange, value}) =>
              <EuiDatePicker required showTimeSelect selected={value ? moment(value) : undefined} onChange={onChange} fullWidth />
            } // props contains: onChange, onBlur and value
          />
        </EuiFormRow>

        <EuiFormRow label="Документи про встановлення" fullWidth>
          <Controller
            name="documentIds"
            control={control}
            render={props =>
              <PhotoLoader onChange={props.onChange} />
            } // props contains: onChange, onBlur and value
          />
        </EuiFormRow>

        <EuiFormRow label="Серія фото встановленого датчика" fullWidth>
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
    </Page>

  )
}

export default NewSensor