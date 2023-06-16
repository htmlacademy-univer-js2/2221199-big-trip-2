import {remove, render, RenderPosition} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import {filters, sorts} from '../utils/util';
import {FiltersTypes, SortTypes, UpdateType, UserAction} from '../utils/consts';
import NewPointPresenter from './new-point-presenter';
import NewPointButtonView from '../view/new-point-button-view';
import LoadingView from '../view/loading-view';


export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;

  #tripListComponent = new TripListView();
  #loadingComponent = new LoadingView();
  #pointPresenters = new Map();
  #newPointPresenter = null;
  // #newPointButtonComponent = null;
  #sortComponent = new SortView();
  #currentSortType = SortTypes.DAY;
  #currentFilterType = FiltersTypes.EVERYTHING;
  #emptyListComponent = null;
  #isLoading = true;

  constructor(container, pointsModel, filterModel) {
    this.#container = container;
    // this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#currentFilterType = this.#filterModel.filter;
    const filteredPoints = filters[this.#currentFilterType](this.#pointsModel.points);
    return sorts[this.#currentSortType](filteredPoints);
  }

  init() {
    // this.#renderNewPointButton();
    this.#renderTrip();
  }

  createPoint = (callback) => {
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersTypes.EVERYTHING);
    this.#newPointPresenter.init(callback);
  }

  #clearTrip = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());

    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  // #handleNewPointFormClose = () => {
  //   this.#newPointButtonComponent.element.disabled = false;
  // }

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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  // #handleNewPointButtonClick = () => {
  //   this.createPoint(this.#handleNewPointFormClose);
  //   this.#newPointButtonComponent.element.disabled = true;
  // }

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN)
  }

  // #renderNewPointButton = () => {
  //   if (this.#newPointButtonComponent === null) {
  //     this.#newPointButtonComponent = new NewPointButtonView();
  //     this.#newPointButtonComponent.setButtonClickHandler(this.#handleNewPointButtonClick);
  //   }
  //   render(this.#newPointButtonComponent, this.#headerContainer);
  // }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) =>
      this.#renderPoint(point)
    );
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#container);
  }

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView(this.#currentFilterType);
    render(this.#emptyListComponent, this.#container);
  }

  #renderTrip = () => {
    if (this.#isLoading) {
      console.log('asd')
      this.#renderLoading();
      return;
    }
    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;

    }

    this.#renderSort();
    render(this.#tripListComponent, this.#container);
    this.#renderPoints();
  }
}
