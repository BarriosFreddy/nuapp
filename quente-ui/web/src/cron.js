import indexDBService from '@quente/common/shared/services/indexDB.service'
import axios from 'axios'
/**
 *
 */
const { REACT_APP_BASE_URL } = process.env
const MAX_RETRY_ATTEMPTS = 3
const INTERVAL_TIME = 1000 * 60 * 60
const SAVE_BILLING_ENDPOINT = '/billings'
const CREATED_HTTPCODE = 201

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: () => true,
})

const exportBillings = async () => {
  const localBillings = await indexDBService.findBillings({ size: 10 })
  console.log('Objects in memory: ', localBillings.length)
  if (localBillings.length > 0) {
    for (const localBilling of localBillings) {
      const localBillingId = localBilling.id
      console.log('Processing object with id: ', localBillingId)
      delete localBilling.id
      const response = await retry(() =>
        axiosInstance({
          url: SAVE_BILLING_ENDPOINT,
          method: 'POST',
          data: localBilling,
        }),
      )
      if (response && response.status === CREATED_HTTPCODE) {
        const deleteResponse = await indexDBService.deleteBilling(localBillingId)
        deleteResponse && console.log('Delete object: ', localBillingId)
      }
    }
  }
}

export const executeTasks = () => {
  setInterval(async () => {
    await exportBillings()
    console.log('Running every minute')
  }, INTERVAL_TIME)
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
