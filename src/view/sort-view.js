import AbstractView from '../framework/view/abstract-view';
import {SortTypes} from '../utils/consts';

const createSortTemplate = (currentSortType) =>
  (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              <div class="trip-sort__item  trip-sort__item--day">
                <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortTypes.DAY ? 'checked' : ''}>
                <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortTypes.DAY}">Day</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--event">
                <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event"  disabled>
                <label class="trip-sort__btn" for="sort-event">Event</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--time">
                <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortTypes.TIME ? 'checked' : ''}>
                <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortTypes.TIME}">Time</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--price">
                <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortTypes.PRICE ? 'checked' : ''}>
                <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortTypes.PRICE}">Price</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--offer">
                <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
                <label class="trip-sort__btn" for="sort-offer">Offers</label>
              </div>
            </form>`
  );

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;
    if (!sortType) {
      return;
    }
    this._callback.sortTypeChange(sortType);
  }
}