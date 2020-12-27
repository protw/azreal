import React, { Fragment } from 'react'
import { EuiButton, EuiEmptyPrompt } from '@elastic/eui'
import Link from 'next/link'

type NotFoundProps = {
  message: string
}

export const NotFound = ({ message }: NotFoundProps) => (
  <EuiEmptyPrompt
    iconType='editorStrike'
    title={<h2>Упс!</h2>}
    body={
      <Fragment>
        <p>{message}</p>
      </Fragment>
    }
    actions={
      <Link href='/'>
        <a>
          <EuiButton color='primary' fill>
            Повернутись на головну
          </EuiButton>
        </a>
      </Link>
    }
  />
)

export const NotFoundPage = () => <NotFound message='Сторінки яку ти шукаєш не існувало, або вже не існує' />