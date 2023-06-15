const DESTINATIONS_COUNT = 3;

const OFFER_TITLES = ['Offer', 'Another offer', 'Usual offer', 'Cheap offer', 'Expensive offer', 'Useless offer', 'Premium offer', 'Good offer', 'Bad offer', 'Amazing offer'];
const MAX_OFFERS_COUNT = 3;
const POINTS_COUNT = 5;

const FiltersTypes = {
  PAST: 'past',
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const EmptyFiltersMessages = {
  PAST: 'There are no past events now',
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {DESTINATIONS_COUNT, OFFER_TITLES, MAX_OFFERS_COUNT, POINTS_COUNT, FiltersTypes, EmptyFiltersMessages, SortTypes, UserAction, UpdateType};
