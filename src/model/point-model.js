import generatePoint from '../mock/point';
import {POINTS_COUNT} from '../utils/consts';
import destinations from '../mock/destination';
import {offersByType} from '../mock/offer';
import Observable from '../framework/observable';

class PointsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, () => generatePoint());
  #destinations = Array.from(destinations);
  #offersByType = JSON.parse(JSON.stringify(offersByType));

  get points() {
    console.log(this.#points);
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      return;
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      return;
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }
}

export default PointsModel;
