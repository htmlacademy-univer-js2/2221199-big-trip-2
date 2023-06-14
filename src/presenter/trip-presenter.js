import {render} from '../framework/render';
import TripList from '../view/trip-list';
import SortView from '../view/sort';
import EmptyListView from '../view/empty-list';
import generateSorts from '../mock/sort';
import PointPresenter from './point-presenter';
import {sorts, updateItem} from '../utils/util';
import {SORT_TYPES} from '../utils/consts';


export default class TripPresenter {
  #container;
  #pointsModel;
  #pointsList;
  #tripListComponent = new TripList();
  #pointPresenter = new Map();
  #sortComponent = new SortView();
  #currentSortType = SORT_TYPES.PRICE;
  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsList = this.#pointsModel.points;
  }

  init() {
    this.#sortPoints(SORT_TYPES.DAY);
    this.#renderTrip();
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPES.TIME:
        this.#pointsList = sorts.sortByTime(this.#pointsList);
        break;
      case SORT_TYPES.PRICE:
        this.#pointsList = sorts.sortByPrice(this.#pointsList);
        break;
      default:
        this.#pointsList = sorts.sortByDay(this.#pointsList);
    }

    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderTripList();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#pointsList.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange)
  }

  #renderTripList = () => {
    render(this.#tripListComponent, this.#container);
    this.#renderPoints();
  }

  #renderEmptyList = () => {
    render(new EmptyListView(), this.#container);
  }

  #renderTrip = () => {
    if (this.#pointsList.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderTripList();
  }
}
