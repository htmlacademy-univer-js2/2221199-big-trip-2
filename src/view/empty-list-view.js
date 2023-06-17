import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../utils/consts';

const EmptyListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
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
