const formatCurrency = (amount) => {
  return Number.isSafeInteger(amount) && amount >= 0
    ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }).format(amount)
    : amount
}

const Utils = {
  formatCurrency,
}
export default Utils
