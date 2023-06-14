import {humanizeDate, humanizeTime} from '../utils/util';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import destinations from '../mock/destination';

const createEditPointTemplate = (point, allOffers, currentDestination) => {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    offers,
  } = point;

  console.log(currentDestination)

  const checkTypePoint = (currentType) => currentType === type ? 'checked' : '';

  const getFullDate = (date, format) => `${humanizeDate(date, format)} ${humanizeTime(date)}`;

  const createOffersList = () => {
    let currentOfferId = 0;
    const getOffer = (offer) =>
      (
        `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${++currentOfferId}" type="checkbox" name="event-offer-comfort" data-id="${offer.id}" ${offers.find((x) => x === offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-comfort-${currentOfferId}"  >
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`);

    return allOffers.map(getOffer).join(' ');
  };
  const createPhotosList = () => {
    const getPhoto = (photo) => (
      `<img class="event__photo" src="${photo.src}" alt="Event photo">`
    );

    return currentDestination.pictures.map(getPhoto).join(' ');
  };

  const destinationsOptions = destinations.map(({name}) => `<option value="${name}">${name}</option>`).join('\n');

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
                      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
                      <datalist id="destination-list-1">
                        ${destinationsOptions}
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
                      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
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
                      ${createOffersList()}
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
  #offers;
  #destination;
  // #handleFormSubmit = null;
  // #handleCloseClick = null;
  constructor(point, offers, destination) {
    super();
    this.#offers = offers;
    this.#destination = destination;
    // this.#handleFormSubmit = onFormSubmit;
    // this.#handleCloseClick = onClose;
    this._setState(EditPointView.parsePointToState(point));
    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destination);
  }

  _restoreHandlers() {
    this.#setInnerHandlers();
    this.setSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  #closeClickHandler = (evt) => {
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
    const newDestination = destinations.filter((destination) => destination.name === evt.target.value);
    if (!newDestination) {
      return;
    }
    this.updateElement({
      destination: newDestination
    });
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #offersChangeHandler = (evt) => {
    const currentOffer = Number(evt.target.dataset.id);
    if (this._state.offers.includes(currentOffer)) {
      this._setState({
        offers: this._state.offers.filter((offer) => offer !== currentOffer)
      })
    }
    else {
      this._setState({
        offers: [...this._state.offers, currentOffer]
      })
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

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
  };

  setSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});
}
