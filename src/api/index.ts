import axios from 'axios'

const baseURL = 'https://google.com'

export default axios.create({
  baseURL,
})
