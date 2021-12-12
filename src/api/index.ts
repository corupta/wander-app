import axios from 'axios'
import { Keyboard } from 'react-native'
import { store } from '../redux/store'
import { WandId } from '../screens/Wand'

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
const getAllUsers = () => axios.get(`${baseURL}users`)
const selectWand = (req: WandId) => axios.put(`${baseURL}users/profile`, req)
const getSpells = () => axios.get(`${baseURL}spells`)
const spellCheck = (req: any) => axios.post(`${baseURL}spell-check`, req)

export { getProfile, getWands, getAllUsers, selectWand, getSpells, spellCheck }
