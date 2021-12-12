import axios from 'axios'
import { Keyboard } from 'react-native'
import { store } from '../redux/store'

const baseURL = 'https://api.wanderapp.cf/'

axios.interceptors.request.use(
  async (config: any) => {
    if (config.method !== 'GET') Keyboard.dismiss()
    const token = store.getState().auth.token

    if (token) config.headers.Authorization = 'Bearer ' + token
    else config.headers.Authorization = ''
    return config
  },
  (error) => Promise.reject(error),
)

const getProfile = () => axios.get(`${baseURL}users/profile`)
const getWands = () => axios.get(`${baseURL}wands`)

export { getProfile, getWands }
