import dayjs from 'dayjs';
import {getRandomInRange} from '../util';

const getRandomDate = () => dayjs()
  .add(getRandomInRange(0, 7), 'day')
  .add(getRandomInRange(0, 23), 'hour')
  .add(getRandomInRange(0, 59), 'minute');

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

