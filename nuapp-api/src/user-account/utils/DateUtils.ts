import * as moment from 'moment';

export const getCurrentDateAsString = () => {
  return moment().format('YYYY-MM-DD');
};
