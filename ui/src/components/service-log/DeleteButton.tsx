import { EuiButtonIcon } from '@elastic/eui'
import { useRouter } from 'next/router'
import React from 'react'
import { useDeleteServiceLog } from 'src/graphql/query/service-log/deleteServiceLog'
import { GetServiceLogs_az_sensors_ServiceLog } from 'src/graphql/query/service-log/types/GetServiceLogs'
import { deleteFiles } from '../files/FileLoader'
import { useNotification } from '../utils/Notifications'

type DeleteButtonProps = {
  serviceLog: GetServiceLogs_az_sensors_ServiceLog
}

export const DeleteButton = ({ serviceLog: { sensorId, serviceKind, timestamp, Document: { fileIds }} }: DeleteButtonProps) => {
  const [ deleteServiceLog ] = useDeleteServiceLog({ sensorId, kind: serviceKind, timestamp })
  const router = useRouter()
  const { addToast } = useNotification()
  return <EuiButtonIcon
    color='danger'
    onClick={async () => {
      await deleteServiceLog()
      await addToast({
        title: 'Видалення успішне',
        color: 'success'
      })
      deleteFiles(fileIds)
      router.reload()
    }}
    iconType="trash"
    aria-label="Next"
  />
}