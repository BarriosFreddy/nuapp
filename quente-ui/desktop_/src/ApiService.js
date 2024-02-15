import axios from 'axios'

//const REACT_APP_BASE_URL = 'http://localhost:3001/api/v1'
const REACT_APP_BASE_URL = 'https://nuapp-api.onrender.com/api/v1'
const MAX_RETRY_ATTEMPTS = 3

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: () => true,
})

export const ApiService = {
  async post(uri, data) {
    return retry(() =>
      axiosInstance({
        url: uri,
        method: 'POST',
        data,
      }),
    )
  },
  async put(uri, data) {
    return await retry(() =>
      axiosInstance({
        url: uri,
        method: 'PUT',
        withCredentials: true,
        data,
      }),
    )
  },
  async get(uri) {
    return await retry(() =>
      axiosInstance({
        url: uri,
        method: 'GET',
        withCredentials: true,
      }),
    )
  },
}

async function retry(request, retryAttempts = 0) {
  let response = null
  try {
    response = await request()
    if (![200, 201, 202].includes(response.status)) {
      console.error('ERROR ', response)
      if (retryAttempts >= MAX_RETRY_ATTEMPTS) return response
      return await retry(request, ++retryAttempts)
    }
    return response
  } catch (error) {
    if (retryAttempts >= MAX_RETRY_ATTEMPTS) return response
    return await retry(request, ++retryAttempts)
  }
}
