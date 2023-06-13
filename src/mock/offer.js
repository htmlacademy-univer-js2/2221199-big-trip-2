import {getRandomInRange} from '../utils/util';
import {OFFER_TITLES, MAX_OFFERS_COUNT} from '../utils/consts';

const generateOffer = (id) => ({
  'id': id,
  'title': OFFER_TITLES[getRandomInRange(0, OFFER_TITLES.length - 1)],
  'price': getRandomInRange(1,200)
});

const offersByType = [
  {
    'type': 'taxi',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'bus',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'train',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'ship',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'drive',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'flight',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'check-in',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'sightseeing',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  },
  {
    'type': 'restaurant',
    'offers': Array.from({length: MAX_OFFERS_COUNT}, (_, i) => generateOffer(i + 1))
  }
];

export {offersByType};
