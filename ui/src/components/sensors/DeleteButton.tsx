import { EuiButton, EuiModal, EuiModalBody, EuiModalHeader, EuiModalHeaderTitle, EuiOverlayMask } from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDeleteSensorById } from 'src/graphql/query/sensors/deleteSensor'
import { NewLog } from '../service-log/NewLog'
import { Loading } from '../utils/loading'
import { useNotification } from '../utils/Notifications'


type DeleteButtonProps = {
  sensorId: number
}

export const DeleteButton = ({ sensorId }: DeleteButtonProps) => {
  const [ deleteSensor, { data: res, error, loading } ] = useDeleteSensorById(sensorId)
  const router = useRouter()
  const { addToast } = useNotification()
  const [ show, setShow ] = useState(false)

  const open = () => {
    setShow(true)
  }
  const close = () => {
    setShow(false)
  }

  const resId = res?.delete_az_sensors_Sensors.returning[0].sensorId

  useEffect(() => {
    if (!resId) return 

    router.push('/sensors')
  }, [ resId, router ])

  const DeleteModal = useCallback(() => show ? <EuiOverlayMask onClick={close}>
    <EuiModal onClose={close}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Внесіть запис про видалення</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <NewLog sensorId={sensorId} onChange={async () => {
          await deleteSensor({ variables: { id: sensorId }})
          await addToast({
            title: 'Датчик успішно видалено',
            color: 'success'
          })

          close()
        }} />
      </EuiModalBody>

    </EuiModal>
  </EuiOverlayMask> : null, [ show ]) 

  if (error) return null

  if (loading) return <Loading />

  return <>
    <EuiButton
      iconType="minusInCircle"
      size="s"
      onClick={open}
    >
    Видалити
    </EuiButton>
    <DeleteModal />
  </>
}