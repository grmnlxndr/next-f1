import axios from 'axios'

const ergastApi = axios.create({
  baseURL: process.env.ERGAST_URL,
})

export default ergastApi