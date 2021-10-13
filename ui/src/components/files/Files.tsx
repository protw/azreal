import { EuiButton, EuiFlexGroup, EuiFormErrorText, EuiModal, EuiModalBody, EuiOverlayMask } from '@elastic/eui'
import React, { useCallback, useState } from 'react'
import { PdfViewer } from './PdfViewer'
import { getFileLinks } from './utils'

type ImagesProps = {
  fileIds: string[]
}
// export const Files = (props: ImagesProps) => <Images {...props} />
export const Files = ({ fileIds }: ImagesProps) => {
  const [ selectLink, setSelectFile ] = useState<string>()
  const [ show, setShow ] = useState(false)
  const links = getFileLinks(fileIds)

  const open = (file: string) => {
    setSelectFile(file)
    setShow(true)
  }
  const close = () => {
    setShow(false)
    setSelectFile(undefined)
  }

  const FileViewer = useCallback(() => {
    try {
      return <PdfViewer url={selectLink} />
    } catch {
      return <EuiFormErrorText>Не вдалося відкрити файл</EuiFormErrorText>
    }
  }, [ selectLink ])

  const ViewFileModal = useCallback(() => selectLink && show ? <EuiOverlayMask onClick={close}>
    <EuiModal onClose={close}>
      <EuiModalBody>
        <FileViewer />
        <PdfViewer url={selectLink} />
      </EuiModalBody>

    </EuiModal>
  </EuiOverlayMask> : null, [ selectLink ]) 

  const FileList = useCallback(() => <>
    {links?.map((link, i) => <EuiButton
      key={link}
      fill
      color="ghost"
      size='s'
      iconType="inspect"
      onClick={() => open(link)}
    >
      {`Файл - ${i + 1}`}
    </EuiButton>)}
  </>, [ links?.length ])

  return <EuiFlexGroup alignItems='flexEnd'>
    <FileList />
    <ViewFileModal />
  </EuiFlexGroup>
  
}