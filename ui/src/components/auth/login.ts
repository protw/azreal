import { uiMsg } from 'src/i18/ua_msg'
import { hasuraSecret, loginUrl } from '../utils'
import { Auth_Obj } from './AuthContext'
import axios from 'axios'

export const checkLogin = async (email: string, password: string) => {

  try {

    const { data } = await axios.post(
      `${loginUrl}/login`,
      { email, password }, 
      { headers: { 
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      }}
    )

    return { data: data as Auth_Obj, token: hasuraSecret }
  } catch (error) {
    const errMsg = error.toString()
    if (errMsg.includes('404'))
      return { error: uiMsg.auth.error.common }

    if (errMsg.includes('401'))
      return { error: uiMsg.auth.error.incorectPassword }

    return { errMsg }
  }
}