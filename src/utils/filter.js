import {FILTERS_TYPES} from './consts';
import {isPointInPast, isPointInFuture} from './util';

const filters = {
  [FILTERS_TYPES.EVERYTHING]: (points) => points,
  [FILTERS_TYPES.PAST]: (points) => points.filter((point) => isPointInPast(point.date_to)),
  [FILTERS_TYPES.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.date_from)),
};

export {filters};
