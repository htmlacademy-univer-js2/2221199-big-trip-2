import AbstractView from '../framework/view/abstract-view';
import {FiltersTypes} from '../utils/consts';

const EmptyListTextType = {
  [FiltersTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FiltersTypes.PAST]: 'There are no past events now',
  [FiltersTypes.FUTURE]: 'There are no future events now',
};

const createEmptyListTemplate = (filterType) => (
  `<p class="trip-events__msg">${EmptyListTextType[filterType]}</p>`
);

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
