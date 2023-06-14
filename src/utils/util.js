import dayjs from 'dayjs';
import {FILTERS_TYPES} from './consts';

const getRandomInRange = (start, end) => start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;

const humanizeDate = (date, form) => dayjs(date).format(form);

const humanizeTime = (date) => dayjs(date).format('HH:mm');
const isPointInFuture = (date) => dayjs().isBefore(date);
const isPointInPast = (date) => dayjs().isAfter(date);

const getDifference = (firstDate, secondDate, param) => dayjs(secondDate).diff(firstDate, param);

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const filters = {
  [FILTERS_TYPES.EVERYTHING]: (points) => points,
  [FILTERS_TYPES.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.date_from)),
  [FILTERS_TYPES.PAST]: (points) => points.filter((point) => isPointInPast(point.date_to)),
};

const sorts = {
  sortByDay: (points) => points.sort((current, next) => getDifference(next.dateFrom, current.dateFrom, '')),
  sortByTime: (points) => points.sort((current, next) => getDifference(next.dateFrom, next.dateTo, 'second') - getDifference(current.dateFrom, current.dateTo, 'second')),
  sortByPrice: (points) => points.sort((current, next) => next.basePrice - current.basePrice),
};

export {getRandomInRange, humanizeDate, humanizeTime, getDifference, isPointInPast, isPointInFuture, filters, sorts, updateItem};
