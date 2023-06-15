import Observable from '../framework/observable';
import {FiltersTypes} from '../utils/consts';

export default class FilterModel extends Observable {
  #filter = FiltersTypes.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
