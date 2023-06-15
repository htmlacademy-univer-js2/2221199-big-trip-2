import {FiltersTypes, UpdateType} from '../utils/consts';
import {filters} from '../utils/util';
import FilterView from '../view/filter-view';
import {remove, render, replace} from '../framework/render';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FiltersTypes.EVERYTHING,
        name: 'EVERYTHING',
        count: filters[FiltersTypes.EVERYTHING](points).length
      },
      {
        type: FiltersTypes.FUTURE,
        name: 'FUTURE',
        count: filters[FiltersTypes.FUTURE](points).length,
      },
      {
        type: FiltersTypes.PAST,
        name: 'PAST',
        count: filters[FiltersTypes.PAST](points).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
