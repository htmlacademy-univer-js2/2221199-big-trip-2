import {getDifference, humanizeDate, humanizeTime} from '../utils/util';
import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';
import he from 'he';

const createPointTemplate = (point, currentOffers, currentDestination) => {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    isFavorite,
    offers
  } = point;

  const dates = {
    'dateFrom': dateFrom !== null ? dateFrom : dayjs().toISOString(),
    'dateTo': dateTo !== null ? dateTo : dayjs().toISOString(),
  };

  const formattedDates = {
    'dateFrom': dateFrom !== null ? humanizeDate(dateFrom, 'YYYY-MM-DD') : humanizeDate(dayjs().toISOString(), 'YYYY-MM-DD'),
    'dateTo': dateTo !== null ? humanizeDate(dateTo, 'YYYY-MM-DD') : humanizeDate(dayjs().toISOString(), 'YYYY-MM-DD'),
    'timeFrom': dateFrom !== null ? humanizeTime(dateFrom) : humanizeTime(dayjs().toISOString()),
    'timeTo': dateTo !== null ? humanizeTime(dateTo) : humanizeTime(dayjs().toISOString()),
  };

  const formatDifference = (difference) => difference < 10 ? `0${difference}` : `${difference}`;


  const calculateDuration = () => {
    const daysDifference = formatDifference(getDifference(dates.dateFrom, dates.dateTo, 'days'));
    const hoursDifference = formatDifference(getDifference(dates.dateFrom, dates.dateTo, 'hours') - daysDifference * 24);
    const minutesDifference = formatDifference(getDifference(dates.dateFrom, dates.dateTo, 'minutes') - daysDifference * 24 * 60 - hoursDifference * 60);

    if (daysDifference !== '00') {
      return `${daysDifference}D ${hoursDifference}H ${minutesDifference}M`;
    }

    if (hoursDifference !== '00') {
      return `${hoursDifference}H ${minutesDifference}M`;
    }

    return `${minutesDifference}M`;
  };

  const createOffersList = () => {
    const getOffer = (offer) => {
      if (offers.find((x) => x === offer.id)) {
        return (
          `<li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </li>`);
      }
    };

    return currentOffers.map(getOffer).join(' ');
  };

  return (
    `<li class="trip-events__item">
                <div class="event">
                  <time class="event__date" datetime="${formattedDates.dateFrom}">${humanizeDate(formattedDates.dateFrom, 'D MMMM')}</time>
                  <div class="event__type">
                    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
                  </div>
                  <h3 class="event__title">${type} ${he.encode(currentDestination.name)}</h3>
                  <div class="event__schedule">
                    <p class="event__time">
                      <time class="event__start-time" datetime="${formattedDates.dateFrom}T${formattedDates.timeFrom}">${formattedDates.timeFrom}</time>
                      &mdash;
                      <time class="event__end-time" datetime="${formattedDates.dateTo}T${formattedDates.timeTo}">${formattedDates.timeTo}</time>
                    </p>
                    <p class="event__duration">${calculateDuration()}</p>
                  </div>
                  <p class="event__price">
                    &euro;&nbsp;<span class="event__price-value">${he.encode(basePrice.toString())}</span>
                  </p>
                  <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">${createOffersList()}</ul>
                  <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                    <span class="visually-hidden">Add to favorite</span>
                    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                    </svg>
                  </button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </div>
              </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destination = null;
  constructor(point, offersByType, destinations) {
    super();
    this.#point = point;
    this.#offers = offersByType.find((offers) => offers.type === this.#point.type).offers;
    this.#destination = destinations.find((destination) => destination.id === this.#point.destination);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destination);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
