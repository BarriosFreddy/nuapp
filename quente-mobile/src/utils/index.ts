import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../models/Item";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const getMainPrice = (item: Item) => {
  const priceRatio = item.pricesRatio?.find(({ main, hash }) => main === hash);
  return priceRatio?.price;
};

export const getMainPriceRatio = (item: Item) => {
  const priceRatio = item.pricesRatio?.find(({ main, hash }) => main === hash);
  return priceRatio;
};

export const getDateObject = () => {
  return {
    date: dayjs().utc().valueOf(),
    offset: dayjs().utcOffset() * 60000,
  };
};

export const getDateAsString = (format = "YYYY-MM-DD") => {
  return dayjs().utcOffset(-5).format(format);
};

export const getExpirationDates = ({ expirationControl }: Item) =>
  expirationControl?.map(({ expirationDate, lotUnits }) => ({
    expirationDate,
    lotUnits,
  })) || [];

export const getUUID = () => {
  return uuidv4();
};

export const cloneObject = (object: any) => {
  if (!object) return;
  return JSON.parse(JSON.stringify(object));
};


export function formatCurrency(amount: number = 0) {
  return '$ ' + (+amount).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}