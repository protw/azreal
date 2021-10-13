import React, { useState, createContext, useContext } from 'react'

import {
  EuiGlobalToastList,
} from '@elastic/eui'
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list'

type ToastProps = {
  title: string,
  color?: 'success' | 'danger' | 'warning',
  text?: React.ReactChild
}

type NotificationContextProps = {
  addToast: (toast: ToastProps) => void
}

const initState = {
  addToast: (_toast) => console.warn('This function default function!') 
}

export const NotificationContext = createContext<NotificationContextProps>(initState)

export const NotificationProvider = ({ children }) => {
  const [ toasts, setToasts ] = useState<Toast[]>([])

  const nextId = () => toasts.length + 1

  const addToast = (toast: ToastProps) => {
    setToasts([ { ...toast, id: nextId().toString() } ])
  }

  const removeToast = (removedToast: Toast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id))
  }

  return (
    <NotificationContext.Provider value={{ addToast }}>
      {children}
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)