import generatePoint from '../mock/point';
import {POINTS_COUNT} from '../utils/consts';
import destinations from '../mock/destination';
import {offersByType} from '../mock/offer';
import Observable from '../framework/observable';

class PointsModel extends Observable {
  #points = [];
  #destinations = [];
  #offersByType = [];

  #pointsApiService = null;

  constructor(pointsApiService) {
    super();

    this.#points = Array.from({length: POINTS_COUNT}, () => generatePoint());
    this.#destinations = Array.from(destinations);
    this.#offersByType = JSON.parse(JSON.stringify(offersByType));

    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      console.log(points.map(this.#adaptToClient));
    })
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

  updatePoint = (updateType, update) => {
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

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points
    ];
    this._notify(updateType, update);
  }

  deletePoint = (updateType, update) => {
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

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']).toISOString(),
      dateTo: new Date(point['date_to']).toISOString(),
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}

export default PointsModel;
