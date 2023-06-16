import dayjs from 'dayjs';
import {FiltersTypes, SortTypes} from './consts';

const getRandomInRange = (start, end) => start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;

const humanizeDate = (date, form) => dayjs(date).format(form);

const humanizeTime = (date) => dayjs(date).format('HH:mm');
const isPointInFuture = (date) => dayjs().isBefore(date);
const isPointInPast = (date) => dayjs().isAfter(date);

const getDifference = (firstDate, secondDate, param) => dayjs(secondDate).diff(firstDate, param);

const isDateEqual = (firstDate, secondDate) => (firstDate === null && secondDate === null) || dayjs(firstDate).isSame(secondDate, 'm');

const filters = {
  [FiltersTypes.EVERYTHING]: (points) => points,
  [FiltersTypes.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FiltersTypes.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

const sorts = {
  [SortTypes.DAY]: (points) => points.sort((current, next) => getDifference(next.dateFrom, current.dateFrom, '')),
  [SortTypes.TIME]: (points) => points.sort((current, next) => getDifference(next.dateFrom, next.dateTo, 'second') - getDifference(current.dateFrom, current.dateTo, 'second')),
  [SortTypes.PRICE]: (points) => points.sort((current, next) => next.basePrice - current.basePrice),
};

export {getRandomInRange, humanizeDate, humanizeTime, getDifference, isPointInPast, isPointInFuture, isDateEqual, filters, sorts};
