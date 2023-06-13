import dayjs from 'dayjs';
import {getRandomInRange} from '../utils/util';

const getRandomDate = () => dayjs()
  .add(getRandomInRange(0, 2), 'day')
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

