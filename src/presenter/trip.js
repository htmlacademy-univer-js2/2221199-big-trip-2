import {render} from '../render';
import TripList from '../view/trip-list';
import SortView from '../view/sort';
import EditPointView from '../view/point-edit';
import PointView from '../view/point';
import NewPointView from '../view/point-new';


export default class Trip {
  constructor(container, pointsModel) {
    this._component = new TripList();
    this._container = container;
    this._pointsModel = pointsModel;
    this._pointsList = this._pointsModel.points;
  }

  init() {
    render(new SortView(), this._container);
    render(this._component, this._container);
    render(new NewPointView(this._pointsModel.getOffers(), this._pointsModel.getDestination()), this._component.getElement());
    render(new EditPointView(this._pointsList[0], this._pointsModel.getOffers(this._pointsList[0]), this._pointsModel.getDestination(this._pointsList[0])), this._component.getElement());
    for (let i = 0; i < this._pointsList.length; i++) {
      const currentPoint = this._pointsList[i];
      render(new PointView(currentPoint, this._pointsModel.getOffers(currentPoint), this._pointsModel.getDestination(currentPoint)), this._component.getElement());
    }
  }
}
