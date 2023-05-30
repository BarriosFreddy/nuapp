import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const formatCurrency = (amount) => {
  return Number.isInteger(amount) && amount >= 0
    ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }).format(amount)
    : amount
}

export const formatDate = (dateObject, format = 'DD-MM-YYYY hh:mm a') => {
  if (typeof dateObject === 'string') {
    return dayjs(dateObject).utcOffset(-300).format(format)
  }
  const { date, offset } = dateObject || {}
  if (!date || !offset) return ''
  return dayjs(date)
    .utcOffset(offset / 60000)
    .format(format)
}
