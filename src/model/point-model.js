import Observable from '../framework/observable';
import {UpdateType} from '../utils/consts';

class PointsModel extends Observable {
  #points = [];
  #destinations = [];
  #offersByType = [];

  #pointsApiService = null;

  constructor(pointsApiService) {
    super();

    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
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

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offersByType = await this.#pointsApiService.offersByType;
      console.log(this.#destinations)
      console.log(this.#offersByType)
    } catch (error) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT)
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
