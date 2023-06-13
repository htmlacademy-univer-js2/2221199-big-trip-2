import AbstractView from '../framework/view/abstract-view';

const createTripInfoTemplate = () => (
  `<ul class="trip-events__list">
    </ul>`
);

export default class TripInfo extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
