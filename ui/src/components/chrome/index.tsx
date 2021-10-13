import React, { FunctionComponent, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'

import {
  EuiButtonEmpty,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiNavDrawer,
  EuiNavDrawerGroup,
  EuiShowFor,
} from '@elastic/eui'
import { isMobile } from 'mobile-device-detect'

import { buildExploreLinks } from '../navigation_links/explore_links'

import { Breadcrumbs } from './breadcrumbs'
import SwitchTheme from './switch_theme'

import styles from './chrome.module.scss'
import { useAuth, useIsManagerAccess } from '../auth/AuthContext'

const Logo: FunctionComponent<{ onClick: () => void }> = ({ onClick }) => (
  <EuiHeaderLogo
    iconType='/images/compress-airzoom.png'
    onClick={onClick}
    aria-label='Goes to home'
  />
)

const MenuTrigger: FunctionComponent<{ onClick: () => void }> = ({
  onClick,
}) => (
  <EuiHeaderSectionItemButton aria-label='Open nav' onClick={onClick}>
    <EuiIcon type='apps' href='#' size='m' />
  </EuiHeaderSectionItemButton>
)

const Chrome: FunctionComponent = ({ children }) => {
  const { signOut, state: { authObj: { userRole }} } = useAuth()
  /**
 * Renders the UI that surrounds the page content.
 */
  // This is an EuiNavDrawer, which isn't a TypeScript module yet
  const navDrawerRef = useRef<EuiNavDrawer>(null)

  const router = useRouter()
  const isManagerAccess = useIsManagerAccess()

  // In this example app, all the side navigation links go to a placeholder
  // page. That's why the `push` call here points at the catch-all route - the
  // Next.js router doesn't infer the catch-all, we have to link to it
  // explicitly.
  const buildOnClick = (path: string) => () =>
    router.push(path, path)

  return (
    <>
      <EuiHeader className={styles.chrHeader}>
        <EuiHeaderSection grow={false}>
          <EuiShowFor sizes={[ 'xs', 's' ]}>
            <EuiHeaderSectionItem border='right'>
              <MenuTrigger onClick={() => navDrawerRef.current!.toggleOpen()} />
            </EuiHeaderSectionItem>
          </EuiShowFor>

          <EuiHeaderSectionItem border='right'>
            <Logo onClick={() => router.push('/')} />
          </EuiHeaderSectionItem>

        </EuiHeaderSection>

        <Breadcrumbs />

        <EuiHeaderSection side={isMobile ? 'left' : 'right'}>
          <EuiHeaderSectionItem className={styles.chrHeaderSectionItem}>
            <SwitchTheme />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem className={styles.chrHeaderSectionItem}>
            <EuiButtonEmpty size='l' onClick={signOut}>Вихід</EuiButtonEmpty>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      <EuiNavDrawer isLocked={false} ref={navDrawerRef}>
        <EuiNavDrawerGroup listItems={buildExploreLinks(buildOnClick, isManagerAccess)} />
      </EuiNavDrawer>
      <div className={isMobile ? styles.chrWrapMob : styles.chrWrap}>{children}</div>
    </>
  )
}

export default Chrome
