const DESTINATIONS_COUNT = 5;

const OFFER_TITLES = ['Offer', 'Another offer', 'Usual offer', 'Cheap offer', 'Expensive offer', 'Useless offer', 'Premium offer', 'Good offer', 'Bad offer', 'Amazing offer'];
const MAX_OFFERS_COUNT = 3;
const POINTS_COUNT = 5;

const FILTERS_TYPES = {
  PAST: 'past',
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const EMPTY_FILTERS_MESSAGES = {
  PAST: 'There are no past events now',
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
};

const SORT_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export {DESTINATIONS_COUNT, OFFER_TITLES, MAX_OFFERS_COUNT, POINTS_COUNT, FILTERS_TYPES, EMPTY_FILTERS_MESSAGES, SORT_TYPES};
