
import React from 'react'

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from '@elastic/eui'

type PageProps = {
  title?: React.ReactNode,
  width?: number
  children?: React.ReactNode
}

export default ({ width, title, children }: PageProps) => (
  <EuiPage restrictWidth={width}>
    <EuiPageBody component="div">
      <EuiPageContent verticalPosition="center" horizontalPosition="center">
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h1>{title}</h1>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>{children}</EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
)