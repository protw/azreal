import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiDatePicker, EuiFormErrorText, EuiForm, EuiDatePickerRange } from '@elastic/eui'
import moment from 'moment'
import React, { useState, useEffect, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useGetServiceLogs } from 'src/graphql/query/service-log/getServiceLogs'
import { GetServiceLogs_az_sensors_ServiceLog } from 'src/graphql/query/service-log/types/GetServiceLogs'
import { SensorsSelect } from '../measurement/SensorsSelect'
import { findErrors, getErrorMsg } from '../utils'
import { Loading } from '../utils/loading'


type ServiceLogSelectorProps = {
  onChange: (serviceLogs: GetServiceLogs_az_sensors_ServiceLog[]) => void,
  sensorId?: number
}

export const ServiceLogSelector = ({ onChange, sensorId: initialSensorId }: ServiceLogSelectorProps) => {
  const { register, handleSubmit, setValue, errors, control, watch } = useForm({
    // resolver: yupResolver()
  })
  const getServiceLog = useGetServiceLogs()
  
  // const { token } = useAuthObj()
  const [ loading, setLoading ] = useState(false)
  
  const from = watch('from')
  const to = watch('to')
  
  useEffect(() => {
    setValue('sensorId', initialSensorId)
  }, [ initialSensorId ])
  
  const onSubmit = async ({ sensorId = initialSensorId }) => {
    setLoading(true)
      
    try {
      const variables = {
        to: to?.toISOString(),
        from: from?.toISOString(),
        sensorId,
      }
    
      const { data, errors } = await getServiceLog(variables)

      if (errors) throw errors

      onChange(data.az_sensors_ServiceLog)
    } catch (err) {
      const message = err?.toString()
  
      errors.load = { message }
  
      console.error(message)
      onChange([])
    }
  
    setLoading(false)  
  }
  
  const SubmitButton = useCallback(() =>
    <EuiButton disabled={loading} fill type="submit">
        Отримати
    </EuiButton>
  , [ loading ])
  
  return (
    <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
  
      <EuiFlexGroup justifyContent='spaceBetween' alignItems='center' >
        <EuiFlexItem>
          <EuiDatePickerRange
            startDateControl={<Controller
              name="from"
              control={control}
              render={({ onChange, value}) =>
                <EuiDatePicker
                  showTimeSelect
                  selected={value ? moment(value) : undefined}
                  onChange={onChange}
                  placeholder='Початкова дата'
                  fullWidth
                />
              } // props contains: onChange, onBlur and value
            />}
            endDateControl={<Controller
              name="to"
              control={control}
              render={({ onChange, value}) =>
                <EuiDatePicker
                  showTimeSelect
                  selected={value ? moment(value) : undefined}
                  onChange={onChange}
                  placeholder='Кінцева дата'
                  fullWidth
                />
              } // props contains: onChange, onBlur and value
            />}
          />  
        </EuiFlexItem>
        {!initialSensorId && <EuiFlexItem >
          <SensorsSelect
            name='sensorId'
            inputRef={register}
            placeholder='Id сенсора'
            defaultValue={undefined}
            fullWidth
            required
          />
        </EuiFlexItem>}
        <EuiFlexItem style={{ maxWidth: 100 }} >
          <SubmitButton />
        </EuiFlexItem>
      </EuiFlexGroup>
      {loading && <Loading />}
      {findErrors(errors).map((err, i) => <EuiFormErrorText key={`error-${i}`}>{getErrorMsg(err)}</EuiFormErrorText>)}
    </EuiForm>
  
  )
}