import axios from 'axios'

const { REACT_APP_BASE_URL } = process.env

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const ApiService = {
  async post(uri, data) {
    return await axiosInstance({
      url: uri,
      method: 'POST',
      data,
    })
  },
  async put(uri, data) {
    return await axiosInstance({
      url: uri,
      method: 'PUT',
      withCredentials: true,
      data,
    })
  },
  async get(uri) {
    return await axiosInstance({
      url: uri,
      method: 'GET',
      withCredentials: true,
    })
  },
}
