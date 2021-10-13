import { EuiButton } from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDeleteOrganisation } from 'src/graphql/query/organisations/deleteOrganisation'
import { deleteFiles } from '../files/FileLoader'
import { Loading } from '../utils/loading'
import { useNotification } from '../utils/Notifications'


type DeleteButtonProps = {
  organisationId: number
  fileIds?: string[]
}

export const DeleteButton = ({ organisationId, fileIds }: DeleteButtonProps) => {
  const [ deleteOrganisation, { data: res, error, loading } ] = useDeleteOrganisation(organisationId)
  const router = useRouter()
  const { addToast } = useNotification()
  const deleteRows = res?.delete_az_users_Organisation.affected_rows || 0

  useEffect(() => {
    if (!deleteRows) return 

    router.push('/organisations')
  }, [ deleteRows, router ])

  if (error) return null

  if (loading) return <Loading />

  return <EuiButton
    iconType="minusInCircle"
    size="s"
    onClick={async () => {
      await deleteOrganisation()
      await addToast({
        title: 'Успішно видалено',
        color: 'success'
      })

      deleteFiles(fileIds)
    }}
  >
    Видалити
  </EuiButton>
}