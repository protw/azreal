import { EuiButton } from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDeleteUser } from 'src/graphql/query/users/deleteUser'
import { Loading } from '../utils/loading'
import { useNotification } from '../utils/Notifications'


type DeleteButtonProps = {
  userId: number
}

export const DeleteButton = ({ userId }: DeleteButtonProps) => {
  const [ deleteUser, { data: res, error, loading } ] = useDeleteUser(userId)
  const { addToast } = useNotification()
  const router = useRouter()

  const deletedId = res?.delete_az_users_Users.returning[0].userId || 0

  useEffect(() => {
    if (!deletedId) return 

    router.push('/users')
  }, [ deletedId, router ])

  if (error) return null

  if (loading) return <Loading />

  return <EuiButton
    iconType="minusInCircle"
    size="s"
    onClick={() => { 
      deleteUser()
      addToast({
        title: 'Успішно видалено',
        color: 'success'
      })
    }}
  >
    Видалити
  </EuiButton>
}