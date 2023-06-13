import dayjs from 'dayjs';
import {FILTERS_TYPES, SORT_TYPES} from './consts';

const getRandomInRange = (start, end) => start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;

const humanizeDate = (date, form) => dayjs(date).format(form);

const humanizeTime = (date) => dayjs(date).format('HH:mm');
const isPointInFuture = (date) => dayjs().isBefore(date);
const isPointInPast = (date) => dayjs().isAfter(date);

const getDifference = (firstDate, secondDate, param) => dayjs(secondDate).diff(firstDate, param);

const filters = {
  [FILTERS_TYPES.EVERYTHING]: (points) => points,
  [FILTERS_TYPES.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.date_from)),
  [FILTERS_TYPES.PAST]: (points) => points.filter((point) => isPointInPast(point.date_to)),
};

const sorts = {
  [SORT_TYPES.DAY]: (points) => points.sort((current, next) => getDifference(next.date_from, current.date_from, 'day')),
  [SORT_TYPES.EVENT]: () => null,
  [SORT_TYPES.TIME]: (points) => points.sort((current, next) => getDifference(current.date_from, current.date_to, 'minute') - getDifference(next.date_from, next.date_to, 'minute')),
  [SORT_TYPES.PRICE]: (points) => points.sort((current, next) => current.base_price - next.base_price),
  [SORT_TYPES.OFFER]: () => null,
};

export {getRandomInRange, humanizeDate, humanizeTime, getDifference, isPointInPast, isPointInFuture, filters, sorts};
