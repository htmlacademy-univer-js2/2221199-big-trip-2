import {remove, render} from '../framework/render';
import TripList from '../view/trip-list';
import SortView from '../view/sort';
import EmptyListView from '../view/empty-list';
import PointPresenter from './point-presenter';
import {sorts} from '../utils/util';
import {SortTypes, UpdateType, UserAction} from '../utils/consts';


export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #tripListComponent = new TripList();
  #pointPresenters = new Map();
  #sortComponent = new SortView();
  #currentSortType = SortTypes.DAY;
  #emptyListComponent = null;
  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return sorts[this.#currentSortType]([...this.#pointsModel.points]);
  }

  init() {
    this.#renderTrip();
  }

  #clearTrip = (resetSortType = false) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    if (!this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip(false);
        this.#renderTrip();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#handleViewAction, this.#handleModelEvent);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView();
    render(this.#emptyListComponent, this.#container);
  }

  #renderTrip = () => {
    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    render(this.#tripListComponent, this.#container);
    this.#renderPoints();
  }
}
