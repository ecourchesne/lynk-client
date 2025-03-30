import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 15000,
    withCredentials: true,
})

export default api
