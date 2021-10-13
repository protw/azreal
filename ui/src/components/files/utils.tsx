import { useEffect, useState } from 'react'

import axios from 'axios'
import { mongoUrl } from '../utils'

const getFile = async (fileId: string) => {
  const { data, status, statusText } = await axios.get(`${mongoUrl}/get/${fileId}`)
  
  if (status !== 200 ) throw new Error(`${status}: ${statusText}`)

  return new File(data, 'test-file', { type: '.png'})
}

export const getFileLinks = (fileIds: string[]) => fileIds.map(fileId => `${mongoUrl}/get/${fileId}`)

export const useGetFiles = (fileIds: string[]) => {
  const [ files, setFiles ] = useState<File[]>()

  useEffect(() => {
    const loadFIles = async () => {
      try {
        const filePromises = fileIds.map(getFile)

        const files = await Promise.all(filePromises)


        setFiles(files)
      } catch (err) {
        console.error(err)
        setFiles([])
      }
    }

    loadFIles()
  }, [ fileIds.length ])

  if (!files) return { loading: true }

  return { data: files, loading: false }
}

export const getFileUri = (file: File) => {
  const urlCreator = window.URL || window.webkitURL 
  return urlCreator.createObjectURL(file)
}
