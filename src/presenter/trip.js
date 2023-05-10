import {render} from '../framework/render';
import TripList from '../view/trip-list';
import SortView from '../view/sort';
import EditPointView from '../view/point-edit';
import PointView from '../view/point';
// import NewPointView from '../view/point-new';
import EmptyListView from '../view/empty-list';


export default class Trip {
  #tripListComponent;
  #container;
  #pointsModel;
  #pointsList;
  constructor(container, pointsModel) {
    this.#tripListComponent = new TripList();
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsList = this.#pointsModel.points;
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(point, this.#pointsModel.getPointOffers(point), this.#pointsModel.getPointDestination(point));
    const pointEditComponent = new EditPointView(point, this.#pointsModel.getPointOffers(point), this.#pointsModel.getPointDestination(point));

    const replacePointToForm = () => {
      this.#tripListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#tripListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setCloseClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#tripListComponent.element);
  }

  #renderBoard = () => {
    if (this.#pointsList.length === 0) {
      render(new EmptyListView(), this.#container);
      return;
    }
    render(new SortView(), this.#container);
    render(this.#tripListComponent, this.#container);

    this.#pointsList.forEach((point) => {
      this.#renderPoint(point);
    })

    // render(new NewPointView(this.#pointsModel.offersByType, this.#pointsModel.destinations), this.#tripListComponent.element);
  }

  init() {
    this.#renderBoard();
  }
}
