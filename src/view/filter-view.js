import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = ({type, name, count}, currentFilterType) => {
  // const {type, name, count} = filter;

  return (`<div class="trip-filters__filter">
            <input id="filter-${name}"
                   class="trip-filters__filter-input  visually-hidden"
                   type="radio"
                   name="trip-filter"
                   value="${type}"
                   ${type === currentFilterType ? 'checked' : ''}
                   ${count === 0 ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
           </div>`)
}

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filtersTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('\n');

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler)
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
