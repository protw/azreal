import { EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader, EuiPageHeaderSection, EuiTitle } from '@elastic/eui'
import React from 'react'

type PageProps = {
  title?: React.ReactNode,
  desc?: React.ReactNode,
  width?: number
  children?: React.ReactNode
}

export const Page = ({ title, desc, children, width }: PageProps) => (
  <EuiPage restrictWidth={width || true}>
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection style={{ width: '100%' }}>
          <EuiTitle size='l'>
            <h1>{title}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>

      <EuiPageContent>
        <EuiPageContentBody>
          <p>{desc}</p>
        </EuiPageContentBody>
        <EuiPageContentBody>
          {children}
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
)