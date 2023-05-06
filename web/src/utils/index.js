import dayjs from 'dayjs'

export const formatCurrency = (amount) => {
  return Number.isSafeInteger(amount) && amount >= 0
    ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }).format(amount)
    : amount
}

export const formatDate = (dateAsString, format = 'DD-MM-YYYY hh:mm a') => {
  return dayjs(dateAsString).format(format)
}
