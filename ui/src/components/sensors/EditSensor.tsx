import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiFieldNumber,
  EuiLoadingSpinner,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
} from '@elastic/eui'

import { SensorProps } from './utils'
import { useUpdateSensorById } from 'src/graphql/query/sensors/updateSensor'
import { useRouter } from 'next/router'

type EditFlayOutProps = SensorProps & {
  onClose: () => void;
};

export const EditSensorForm = ({
  sensor: { model, manufacturer, sensorId, sideNumber },
}: EditFlayOutProps) => {
  const [ updateSensors, { data: res } ] = useUpdateSensorById(sensorId)
  const [ loading, setLoading ] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, watch, setValue } = useForm()

  const watchModel = watch('model')
  const watchManufacturer = watch('manufacturer')
  const watchSideNumber = watch('sideNumber')

  useEffect(() => {
    setValue('sensorId', sensorId)
    setValue('model', model)
    setValue('manufacturer', manufacturer)
    setValue('sideNumber', sideNumber)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const notChange = watchModel === model &&
    watchManufacturer === manufacturer &&
    watchSideNumber === sideNumber

  const resSensorId = res?.update_az_sensors_Sensors.returning[0].sensorId

  useEffect(() => {
    if (!resSensorId) return

    router.reload()
  }, [ resSensorId, router ])

  const onSubmit = async sensorData => {
    setLoading(true)
    try {
      await updateSensors({
        variables: {
          ...sensorData,
        },
      })
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const SubmitButton = useCallback(
    () =>
      loading ? (
        <EuiLoadingSpinner size='m' />
      ) : (
        <EuiButton type='submit' disabled={notChange} fill>
          Редагувати датичк
        </EuiButton>
      ),
    [ loading, notChange ]
  )

  return (
    <EuiForm component='form' onSubmit={handleSubmit(onSubmit)}>
  
      <EuiFormRow label='Бортовий номер датчика' fullWidth>
        <EuiFieldNumber
          name='sideNumber'
          placeholder='Бортовий номер датчика'
          inputRef={register({ required: true })}
          fullWidth
          required
        />
      </EuiFormRow>

      <EuiFormRow label='Виробник' fullWidth>
        <EuiFieldText name='manufacturer' inputRef={register} fullWidth />
      </EuiFormRow>

      <EuiFormRow label='Модель' fullWidth>
        <EuiFieldText name='model' inputRef={register} fullWidth />
      </EuiFormRow>

      <EuiSpacer />
      <SubmitButton />
    </EuiForm>
  )
}

const EditFlayOut = (props: EditFlayOutProps) => (
  <EuiFlyout ownFocus onClose={props.onClose} aria-labelledby='flyoutTitle'>
    <EuiFlyoutHeader hasBorder>
      <EuiTitle size='m'>
        <h2 id='flyoutTitle'>Редагувати датчик</h2>
      </EuiTitle>
    </EuiFlyoutHeader>
    <EuiFlyoutBody>
      <EditSensorForm {...props} />
    </EuiFlyoutBody>
  </EuiFlyout>
)

export const EditButton = ({ sensor }: SensorProps) => {
  const [ isFlyoutVisible, setIsFlyoutVisible ] = useState(false)

  const FlayOut = useCallback(
    () =>
      isFlyoutVisible ? (
        <EditFlayOut
          onClose={() => setIsFlyoutVisible(false)}
          sensor={sensor}
        />
      ) : null,
    [ isFlyoutVisible, sensor ]
  )

  return (
    <>
      <EuiButton
        iconType='documentEdit'
        size='s'
        onClick={() => setIsFlyoutVisible(true)}>
        Редагувати
      </EuiButton>
      <FlayOut />
    </>
  )
}
