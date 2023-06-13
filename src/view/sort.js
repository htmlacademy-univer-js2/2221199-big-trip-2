import AbstractView from '../framework/view/abstract-view';
import {SORT_TYPES} from '../utils/consts';

const createSortTemplate = (sorts) => {
  const sortsTemplate = sorts.map(({ name }) =>
    `<div class="trip-sort__item  trip-sort__item--${name}">
                <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
                value="sort-${name}" ${name === SORT_TYPES.EVENT || name === SORT_TYPES.OFFER ? 'disabled' : ''} ${name === SORT_TYPES.PRICE  ? 'checked' : ''}>
                <label class="trip-sort__btn" for="sort-${name}">${name}</label>
              </div>`
  ).join(' ');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortsTemplate}
            </form>`
  );
};

export default class SortView extends AbstractView {
  #sorts;
  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }
}
