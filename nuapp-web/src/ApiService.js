import axios from 'axios'

const { REACT_APP_BASE_URL } = process.env

export const ApiService = {
  async post(uri, data) {
    return await axios({
      url: `${REACT_APP_BASE_URL}${uri}`,
      method: 'POST',
      withCredentials: true,
      data,
    })
  },
  async put(uri, data) {
    return await axios({
      url: `${REACT_APP_BASE_URL}${uri}`,
      method: 'PUT',
      withCredentials: true,
      data,
    })
  },
  async get(uri) {
    return await axios({
      url: `${REACT_APP_BASE_URL}${uri}`,
      method: 'GET',
      withCredentials: true,
    })
  },
}
