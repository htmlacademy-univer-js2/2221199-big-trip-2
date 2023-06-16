import {humanizeDate, humanizeTime} from '../utils/util';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

const createEditPointTemplate = (point, destinations) => {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    offers,
    destination,
    currTypeOffers
  } = point;

  const currentDestination = destinations[destination];

  const checkTypePoint = (currentType) => currentType === type ? 'checked' : '';

  const getFullDate = (date, format) => `${humanizeDate(date, format)} ${humanizeTime(date)}`;

  const createOffersList = () =>
    currTypeOffers.map((offer) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer.id}" type="checkbox" name="event-offer-comfort" data-id="${offer.id}" ${offers.find((x) => x === offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-comfort-${offer.id}"  >
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`)
    ).join(' ');

  const createPhotosList = () => currentDestination.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join(' ');

  const createDestinationsOptions = () => destinations.map(({name}) => `<option value="${name}">${name}</option>`).join('\n');

  return (
    `<li class="trip-events__item">
                <form class="event event--edit" action="#" method="post">
                  <header class="event__header">
                    <div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-1">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                      </label>
                      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Event type</legend>

                          <div class="event__type-item">
                            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${checkTypePoint('taxi')}>
                            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${checkTypePoint('bus')}>
                            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${checkTypePoint('train')}>
                            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${checkTypePoint('ship')}>
                            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${checkTypePoint('drive')}>
                            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${checkTypePoint('flight')}>
                            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${checkTypePoint('check-in')}>
                            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${checkTypePoint('sightseeing')}>
                            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                          </div>

                          <div class="event__type-item">
                            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${checkTypePoint('restaurant')}>
                            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div class="event__field-group  event__field-group--destination">
                      <label class="event__label  event__type-output" for="event-destination-1">
                        ${type}
                      </label>
                      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(currentDestination.name)}" list="destination-list-1">
                      <datalist id="destination-list-1">
                        ${createDestinationsOptions()}
                      </datalist>
                    </div>

                    <div class="event__field-group  event__field-group--time">
                      <label class="visually-hidden" for="event-start-time-1">From</label>
                      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(dateFrom, 'DD/MM/YY')}">
                      &mdash;
                      <label class="visually-hidden" for="event-end-time-1">To</label>
                      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(dateTo, 'DD/MM/YY')}">
                    </div>

                    <div class="event__field-group  event__field-group--price">
                      <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                      </label>
                      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(basePrice.toString())}">
                    </div>
                    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                    <button class="event__reset-btn" type="reset">Delete</button>
                    <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                  </header>
                  <section class="event__details">
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
                      ${createOffersList()}
                      </div>
                    </section>
                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${currentDestination.description}</p>
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${createPhotosList()}
                        </div>
                      </div>
                    </section>
                  </section>
                </form>
              </li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #datepickerFrom = null;
  #datepickerTo = null;
  #offersByType = null;
  #destinations = null;
  #isNewPoint = null;
  constructor({point = BLANK_POINT, offersByType, destinations, isNewPoint}) {
    super();
    this.#offersByType = offersByType;
    this.#destinations = destinations;
    this.#isNewPoint = isNewPoint;
    this._setState(EditPointView.parsePointToState(point, this.#offersByType));
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    this.#removeDatepicker(this.#datepickerFrom);
    this.#removeDatepicker(this.#datepickerTo);
  }

  #removeDatepicker = (datepicker) => {
    if (datepicker) {
      datepicker.destroy();
      datepicker = null;
    }
  }

  _restoreHandlers() {
    this.#setInnerHandlers();

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #setOuterHandlers = () => {
    if (!this.#isNewPoint) {
      this.setCloseClickHandler(this._callback.closeClick);
    }
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point, this.#offersByType));
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointView.parseStateToPoint(this._state));
  }

  #formCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #priceChangeHandler = (evt) => {
    this.updateElement({
      basePrice: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    if (!newDestination) {
      return;
    }
    this.updateElement({
      destination: newDestination.id
    });
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: [],
      currTypeOffers: this.#offersByType.find((x) => x.type === evt.target.value).offers
    });
  };

  #offersChangeHandler = (evt) => {
    const currentOffer = Number(evt.target.dataset.id);
    if (this._state.offers.includes(currentOffer)) {
      this._setState({
        offers: this._state.offers.filter((offer) => offer !== currentOffer)
      });
    }
    else {
      this._setState({
        offers: [...this._state.offers, currentOffer]
      });
    }
    this.updateElement({
      offers: this._state.offers,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__section--offers').addEventListener('change', this.#offersChangeHandler);
  };

  #datepickerFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  }

  #datepickerToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  }

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        enableTime: true,
        onChange: this.#datepickerFromChangeHandler,
      }
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        enableTime: true,
        onChange: this.#datepickerToChangeHandler,
      }
    );
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  static parsePointToState = (point, offersByType) => ({
    ...point,
    currTypeOffers: offersByType.find((x) => x.type === point.type).offers
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    delete point.currTypeOffers;
    return point;
  };
}
