import {render} from '../render';
import TripList from '../view/trip-list';
import SortView from '../view/sort';
import EditPointView from '../view/point-edit';
import PointView from '../view/point';
import NewPointView from '../view/point-new';


export default class Trip {
  #component;
  #container;
  #pointsModel;
  #pointsList;
  constructor(container, pointsModel) {
    this.#component = new TripList();
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsList = this.#pointsModel.points;
  }

  init() {
    render(new SortView(), this.#container);
    render(this.#component, this.#container);
    render(new NewPointView(this.#pointsModel.offersByType, this.#pointsModel.destinations), this.#component.element);
    render(new EditPointView(this.#pointsList[0], this.#pointsModel.getPointOffers(this.#pointsList[0]), this.#pointsModel.getPointDestination(this.#pointsList[0])), this.#component.element);
    for (let i = 0; i < this.#pointsList.length; i++) {
      const currentPoint = this.#pointsList[i];
      render(new PointView(currentPoint, this.#pointsModel.getPointOffers(currentPoint), this.#pointsModel.getPointDestination(currentPoint)), this.#component.element);
    }
  }
}
