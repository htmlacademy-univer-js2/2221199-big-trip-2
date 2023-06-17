import AbstractView from '../framework/view/abstract-view';
import {humanizeDate, sorts} from '../utils/util';
import {SortType} from '../utils/consts';


const createTripInfoView = (points, offersByType, destinations) => {
  const getOfferPrice = (offers, offerId) => offers.find((offer) => offer.id === offerId).price;

  const getFullPointPrice = (point) => {
    const currentTypeOffers = offersByType.find((offers) => offers.type === point.type).offers;
    const offersPrice = point.offers.reduce((price, currentOfferId) => getOfferPrice(currentTypeOffers, currentOfferId) + price, 0);
    return point.basePrice + offersPrice;
  };

  const getFullTripPrice = () => points.reduce((price, currentPoint) => getFullPointPrice(currentPoint) + price, 0);

  const getTripDates = () => `${humanizeDate(points[0].dateFrom, 'MMM D')}&nbsp;&mdash;&nbsp;${humanizeDate(points[points.length - 1].dateTo, 'MMM D')}`;

  const getTitle = () => {
    const cities = [];
    points.forEach((point) => {
      const currentCity = destinations.find((destination) => destination.id === point.destination).name;
      if (cities.length === 0 || cities[cities.length - 1] !== currentCity) {
        cities.push(currentCity);
      }
    });

    return cities.length > 3
      ? `${cities[0]} &mdash;...&mdash; ${cities[cities.length - 1]}`
      : cities.join(' &mdash; ');
  };

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getTitle()}</h1>

              <p class="trip-info__dates">${getTripDates()}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullTripPrice()}</span>
            </p>
          </section>`;
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #offersByType = null;
  #destinations = null;

  constructor(points, offersByType, destinations) {
    super();
    this.#points = sorts[SortType.DAY](points);
    this.#offersByType = offersByType;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoView(this.#points, this.#offersByType, this.#destinations);
  }
}
