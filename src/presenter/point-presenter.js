import PointView from '../view/point';
import EditPointView from '../view/point-edit';
import {remove, render, replace} from '../framework/render';

export default class PointPresenter {
  #tripListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #pointsModel = null;
  #changeData = null;

  constructor(tripListContainer, pointsModel, changeData) {
    this.#tripListContainer = tripListContainer;
    this.#pointsModel = pointsModel;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(this.#point, this.#pointsModel.getPointOffers(this.#point), this.#pointsModel.getPointDestination(this.#point));
    this.#pointEditComponent = new EditPointView(this.#point, this.#pointsModel.getPointOffers(this.#point), this.#pointsModel.getPointDestination(this.#point));

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointComponent.setEditClickHandler(() => {
      this.#replacePointToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setCloseClickHandler(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setSubmitHandler(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    if (prevPointComponent == null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripListContainer)
      return
    }

    if (this.#tripListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent)
    }

    if (this.#tripListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent)
    }

    remove(prevPointComponent)
    remove(prevPointEditComponent)
  };

  destroy = () => {
    remove(this.#pointComponent)
    remove(this.#pointEditComponent)
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePointToForm();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite})
  };
}
