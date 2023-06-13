import generatePoint from '../mock/point';
import {POINTS_COUNT} from '../utils/consts';
import destinations from '../mock/destination';
import {offersByType} from '../mock/offer';

class PointsModel {
  #points;
  #destinations;
  #offersByType;
  constructor() {
    this.#points = Array.from({length: POINTS_COUNT}, (_, i) => generatePoint(i + 1));
    this.#destinations = Array.from(destinations);
    this.#offersByType = JSON.parse(JSON.stringify(offersByType));
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }

  getPointDestination(point) {
    return point ? this.#destinations.find((x) => x.id === point.destination) : this.#destinations;
  }

  getPointOffers(point) {
    return point ? this.#offersByType.find((x) => x.type === point.type).offers : this.#offersByType;
  }
}

export default PointsModel;
