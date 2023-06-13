import {getRandomInRange} from '../utils/util';
import {createRandomDates} from './date';
import {DESTINATIONS_COUNT, MAX_OFFERS_COUNT} from '../utils/consts';
import {nanoid} from 'nanoid';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const generateTypePoint = () => POINT_TYPES[getRandomInRange(0, POINT_TYPES.length - 1)];

const generateBasePrice = () => getRandomInRange(100, 1500);

const generatePoint = () => {
  const generatedDates = createRandomDates();

  return {
    'id': nanoid(),
    'type': generateTypePoint(),
    'base_price': generateBasePrice(),
    'date_from': generatedDates.dateFrom,
    'date_to': generatedDates.dateTo,
    'destination': getRandomInRange(0, DESTINATIONS_COUNT - 1),
    'is_favorite': Boolean(getRandomInRange(0, 1)),
    'offers': Array.from({length: getRandomInRange(0, MAX_OFFERS_COUNT)}, (_, i) => i + 1),
  };
};

export default generatePoint;
