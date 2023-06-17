import dayjs from 'dayjs';
import {FilterType, SortType} from './consts';


const humanizeDate = (date, form) => dayjs(date).format(form);

const humanizeTime = (date) => dayjs(date).format('HH:mm');
const isPointInFuture = (date) => dayjs().isBefore(date);
const isPointInPast = (date) => dayjs().isAfter(date);

const isFirstDateBeforeSecond = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom)) > 0;

const getDifference = (firstDate, secondDate, param) => dayjs(secondDate).diff(firstDate, param);

const isDateEqual = (firstDate, secondDate) => (firstDate === null && secondDate === null) || dayjs(firstDate).isSame(secondDate, 'm');

const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

const sorts = {
  [SortType.DAY]: (points) => points.sort((current, next) => getDifference(next.dateFrom, current.dateFrom, '')),
  [SortType.TIME]: (points) => points.sort((current, next) => getDifference(next.dateFrom, next.dateTo, 'second') - getDifference(current.dateFrom, current.dateTo, 'second')),
  [SortType.PRICE]: (points) => points.sort((current, next) => next.basePrice - current.basePrice),
};

export {humanizeDate, humanizeTime, getDifference, isPointInPast, isPointInFuture, isFirstDateBeforeSecond, isDateEqual, filters, sorts};
