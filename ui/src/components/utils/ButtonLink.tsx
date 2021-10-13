import { EuiButton, EuiButtonProps } from '@elastic/eui'
import Link from 'next/link'
import React from 'react'

type ButtonLinkProps = EuiButtonProps & {
  href: string
  as?: string
  style?: any
  children: React.ReactNode
}

export const ButtonLink = ({ href, as, children, ...props }: ButtonLinkProps) => <Link href={href} as={as}>
  <a>
    <EuiButton {...props}>
      {children}
    </EuiButton>
  </a>
</Link>