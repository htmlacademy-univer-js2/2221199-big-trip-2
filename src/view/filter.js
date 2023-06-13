import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = (filters) => {

  const filtersTemplate = filters.map(({ name, filteredPoints }, index) =>
    `<div class="trip-filters__filter">
                      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${index === 0 ? 'checked' : 0} ${filteredPoints.count === 0 ? 'disabled' : 0}>
                      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
                    </div>`
  ).join(' ');

  return (
    `<form class="trip-filters" action="#" method="get">
                  ${filtersTemplate}
                  <button class="visually-hidden" type="submit">Accept filter</button>
                </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters;
  constructor(filters) {
    super();
    this.#filters = filters;
  }
  get template() {
    return createFilterTemplate(this.#filters);
  }
}
