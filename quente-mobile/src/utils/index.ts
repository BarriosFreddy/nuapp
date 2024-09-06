import { Item } from "../models/Item";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const getMainPrice = (item: Item) => {
  const priceRatio = item.pricesRatio.find(({ main, hash }) => main === hash);
  return priceRatio?.price;
};

export const getMainPriceRatio = (item: Item) => {
  const priceRatio = item.pricesRatio.find(({ main, hash }) => main === hash)
  return priceRatio
}


export const formatCurrency = (amount: number) => {
  let formattedCurrency;
  try {
    formattedCurrency = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(+amount);
  } catch (e) {
    console.error(e);
  }
  return formattedCurrency;
};

export const getDateObject = () => {
  return {
    date: dayjs().utc().valueOf(),
    offset: dayjs().utcOffset() * 60000,
  }
}

export const getDateAsString = (format = 'YYYY-MM-DD') => {
  return dayjs().utcOffset(-5).format(format)
}