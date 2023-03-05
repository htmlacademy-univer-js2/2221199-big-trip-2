import TripList from '../view/trip-list';
import SortView from '../view/sort';
import {render} from '../render';
import EditPointView from '../view/point-edit';
import PointView from '../view/point';

const POINTS_COUNT = 3;


export default class Trip {
  constructor(container) {
    this.component = new TripList();
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);
    render(this.component, this.container);
    render(new EditPointView(), this.component.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.component.getElement());
    }
  }
}
