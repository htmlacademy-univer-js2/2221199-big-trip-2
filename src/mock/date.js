import dayjs from 'dayjs';
import {getRandomInRange} from '../util';

const getRandomDate = () => dayjs()
  .add(getRandomInRange(1, 7), 'day')
  .add(getRandomInRange(1, 23), 'hour')
  .add(getRandomInRange(1, 59), 'minute');

const createRandomDates = () => {
  const firstDate = getRandomDate();
  const secondDate = getRandomDate();

  return firstDate.isBefore(secondDate)
    ? {
      'dateFrom': firstDate.toISOString(),
      'dateTo': secondDate.toISOString()
    }
    : {
      'dateFrom': secondDate.toISOString(),
      'dateTo': firstDate.toISOString()
    };
};

export {createRandomDates};

