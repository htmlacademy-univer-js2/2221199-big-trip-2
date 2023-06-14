import {render} from '../framework/render';
import TripList from '../view/trip-list';
import SortView from '../view/sort';
import EmptyListView from '../view/empty-list';
import generateSorts from '../mock/sort';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/util';


export default class TripPresenter {
  #container;
  #pointsModel;
  #pointsList;
  #tripListComponent = new TripList();
  #pointPresenter = new Map();
  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsList = this.#pointsModel.points;
  }

  init() {
    this.#renderBoard();
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
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
    const sorts = generateSorts(this.#pointsModel.points);
    render(new SortView(sorts), this.#container);
  }

  #renderTripList = () => {
    render(this.#tripListComponent, this.#container);
    this.#renderPoints();
  }

  #renderEmptyList = () => {
    render(new EmptyListView(), this.#container);
  }

  #renderBoard = () => {
    if (this.#pointsList.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderTripList();
  }
}
