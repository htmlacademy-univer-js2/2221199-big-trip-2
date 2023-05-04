import generatePoint from '../mock/point';
import {POINTS_COUNT} from '../consts';
import destinations from '../mock/destination';
import {offersByType} from '../mock/offer';

class PointsModel {
  constructor() {
    this._points = Array.from({length: POINTS_COUNT}, (_, i) => generatePoint(i + 1));
    this._destinations = Array.from(destinations);
    this._offersByType = JSON.parse(JSON.stringify(offersByType));
  }

  get points() {
    return this._points;
  }

  getDestination(point) {
    return point ? this._destinations.find((x) => x.id === point.destination) : this._destinations;
  }

  getOffers(point) {
    return point ? this._offersByType.find((x) => x.type === point.type).offers : this._offersByType;
  }
}

export default PointsModel;
