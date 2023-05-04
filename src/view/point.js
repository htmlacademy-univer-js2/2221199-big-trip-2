import {createElement} from '../render';
import {humanizeDate, humanizeTime} from '../util';
import dayjs from 'dayjs';

const createPointTemplate = (point, currentOffers, currentDestination) => {
  const {
    type,
    base_price,
    date_from,
    date_to,
    is_favorite,
    offers
  } = point;

  const dates = {
    'dateFrom': date_from !== null ? date_from : dayjs().toISOString(),
    'dateTo': date_to !== null ? date_to : dayjs().toISOString(),
  }

  const formattedDates = {
    'dateFrom': date_from !== null ? humanizeDate(date_from, 'YYYY-MM-DD') : humanizeDate(dayjs().toISOString(), 'YYYY-MM-DD'),
    'dateTo': date_to !== null ? humanizeDate(date_to, 'YYYY-MM-DD') : humanizeDate(dayjs().toISOString(), 'YYYY-MM-DD'),
    'timeFrom': date_from !== null ? humanizeTime(date_from) : humanizeTime(dayjs().toISOString()),
    'timeTo': date_to !== null ? humanizeTime(date_from) : humanizeTime(dayjs().toISOString()),
  }

  const eventEndTime = formattedDates.dateFrom === formattedDates.dateTo ? formattedDates.timeTo : formattedDates.dateTo;

  const formatDifference = (difference) => difference < 10 ? `0${difference}` : `${difference}`;

  const getDifference = (firstDate, secondDate, param) => dayjs(secondDate).diff(firstDate, param);

  const calculateDuration = () => {
    const daysDifference = formatDifference(getDifference(dates.dateFrom, dates.dateTo, 'days'));
    const hoursDifference = formatDifference(getDifference(dates.dateFrom, dates.dateTo, 'hours'));
    const minutesDifference = formatDifference(getDifference(dates.dateFrom, dates.dateTo, 'minutes'));

    if (daysDifference !== '00') {
      return `${daysDifference}D ${hoursDifference}H ${minutesDifference}M`;
    }

    if (hoursDifference !== '00') {
      return `${hoursDifference}H ${minutesDifference}M`;
    }

    return `${minutesDifference}M`;
  }

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
                  <h3 class="event__title">${type} ${currentDestination.name}</h3>
                  <div class="event__schedule">
                    <p class="event__time">
                      <time class="event__start-time" datetime="${formattedDates.dateFrom}T${formattedDates.timeFrom}">${humanizeTime(formattedDates.dateFrom)}</time>
                      &mdash;
                      <time class="event__end-time" datetime="${formattedDates.dateTo}T${formattedDates.timeTo}">${eventEndTime}</time>
                    </p>
                    <p class="event__duration">${calculateDuration()}</p>
                  </div>
                  <p class="event__price">
                    &euro;&nbsp;<span class="event__price-value">${base_price}</span>
                  </p>
                  <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">${createOffersList()}</ul>
                  <button class="event__favorite-btn ${is_favorite ? 'event__favorite-btn--active' : ''}" type="button">
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

export default class PointView {
  constructor(point, offers, destination) {
    this.point = point;
    this.offers = offers;
    this.destination = destination
  }
  getTemplate() {
    return createPointTemplate(this.point, this.offers, this.destination);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
