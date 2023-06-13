import dayjs from 'dayjs';

const getRandomInRange = (start, end) => start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;

const humanizeDate = (date, form) => dayjs(date).format(form);

const humanizeTime = (date) => dayjs(date).format('HH:mm');
const isPointInFuture = (date) => dayjs().isBefore(date);
const isPointInPast = (date) => dayjs().isAfter(date);



export {getRandomInRange, humanizeDate, humanizeTime, isPointInPast, isPointInFuture};
