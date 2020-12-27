import React, { useReducer, createContext, useContext, useEffect } from 'react'
import Chrome from '../chrome'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { graphqlUrl } from '../utils'
import { LoginPage } from './Login'
import { NotFoundPage } from '../utils/NotFoundPage'

const MY_AUTH_OBJECT = 'auth-object'

type UserRole = 'user' | 'manager'

export type Auth_Obj = {
  userId: number,
  userRole: UserRole,
  token: string
}

export function readAuthObj (): Auth_Obj | undefined {
  const json = localStorage.getItem(MY_AUTH_OBJECT)

  const authObj: Auth_Obj | undefined = json ? JSON.parse(json) :undefined 
  return authObj
}

export function localStorageAuthObj (authObj: Auth_Obj) {
  localStorage.setItem(MY_AUTH_OBJECT, JSON.stringify(authObj))
}

type AuthState = {
  inited: boolean,
  authObj?: Auth_Obj
};

type AuthAction = {
  type: 'reload' | 'setAuthObj' | 'forget' | 'forgetExact';
  authObj?: Auth_Obj
};

function reducer (state: AuthState, action: AuthAction): AuthState {
  function forget () {
    localStorage.removeItem(MY_AUTH_OBJECT)
    return { ...state, authObj: undefined }
  }

  let authObj: Auth_Obj | undefined

  switch (action.type) {
    case 'reload':
      authObj = readAuthObj()
      return { ...state, authObj, inited: true }

    case 'setAuthObj':
      if (authObj?.userId !== action.authObj.userId) {
        authObj = action.authObj
        if (authObj) {
          localStorageAuthObj(authObj)
          return { ...state, authObj, inited: true }
        } else {
          return forget()
        }
      }
      return state

    case 'forget':
      return forget()

    default:
      throw new Error('No action type provided')
  }
}

function functionStub () {
  console.error(`Function needs to be set in ${AuthProvider.name}`)
}

const initialState = {
  inited: false,
  authObj: undefined
}

export type AuthContextProps = {
  state: AuthState,
  dispatch: React.Dispatch<AuthAction>,
  setAuthObj: (authObj: Auth_Obj) => void,
  signOut: () => void
};

const contextStub: AuthContextProps = {
  state: initialState,
  dispatch: functionStub,
  setAuthObj: functionStub,
  signOut: functionStub
}

export const AuthContext = createContext<AuthContextProps>(contextStub)

export function AuthProvider (props: React.PropsWithChildren<any>) {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { inited, authObj } = state

  useEffect(() => {
    if (!inited) {
      dispatch({ type: 'reload' })
    }
  }, [ inited ]) // Don't call this effect if `invited` is not changed

  const contextValue = {
    state,
    dispatch,
    setAuthObj: (authObj: Auth_Obj) => dispatch({ type: 'setAuthObj', authObj }),
    signOut: () => dispatch({ type: 'forget' })
  }

  if (!authObj) return <AuthContext.Provider value={contextValue}>
    <LoginPage />
  </AuthContext.Provider>


  const client = new ApolloClient({
    uri: graphqlUrl,
    headers: {
      'x-hasura-admin-secret': authObj?.token,
      'content-type': 'application/json'
    }
  })

  return (
    <AuthContext.Provider value={contextValue}>
      <ApolloProvider client={client}>
        <Chrome>
          {props.children}
        </Chrome>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}

export function useAuthObj () {
  return useAuth().state.authObj
}

export function useIsSignedIn () {
  return !!useAuthObj()
}

export const useIsIAm = (userId: number) => useAuthObj().userId === userId

export const useIsManagerAccess = () => useAuthObj()?.userRole === 'manager'

export const OnlyManagerAccess = ({ children }) => useIsManagerAccess() ? children : null
export const OnlyManagerPage = ({ children }) => useIsManagerAccess() ? children : <NotFoundPage />

export default AuthProvider
