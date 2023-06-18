import {remove, render, RenderPosition} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import {filters, sorts} from '../utils/util';
import {FilterType, SortType, TimeLimit, UpdateType, UserAction} from '../utils/consts';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import TripInfoView from '../view/trip-info-view';


export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #tripListComponent = new TripListView();
  #loadingComponent = new LoadingView();
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #sortComponent = new SortView();
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;
  #emptyListComponent = null;
  #isLoading = true;
  #tripInfoComponent = null;
  #headerContainer = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor(container, headerContainer, pointsModel, filterModel) {
    this.#container = container;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#viewActionHandler);

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    this.#currentFilterType = this.#filterModel.filter;
    const filteredPoints = filters[this.#currentFilterType](this.#pointsModel.points);
    return sorts[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderTrip();
  }

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback);
  }

  #clearTrip = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());

    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    this.#clearTripInfo();
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #clearTripInfo = () => {
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  }

  #renderTripInfo = () => {
    if (this.#tripInfoComponent === null) {
      this.#tripInfoComponent = new TripInfoView(this.#pointsModel.points, this.#pointsModel.offersByType, this.#pointsModel.destinations);
    }

    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#viewActionHandler, this.#modeChangeHandler);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) =>
      this.#renderPoint(point)
    );
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
    render(this.#sortComponent, this.#container);
  }

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView(this.#currentFilterType);
    render(this.#emptyListComponent, this.#container);
  }

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;

    }
    this.#renderTripInfo();
    this.#renderSort();
    render(this.#tripListComponent, this.#container);
    this.#renderPoints();
  }

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  }

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
    }
  }

  #modeChangeHandler = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }
}
