import PointView from '../view/point';
import EditPointView from '../view/point-edit';
import {remove, render, replace} from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #tripListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #pointsModel = null;
  #handleDataChange = null;
  HandleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor(tripListContainer, pointsModel, onChangeData, onChangeMode) {
    this.#tripListContainer = tripListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onChangeData;
    this.HandleModeChange = onChangeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(this.#point, this.#pointsModel.getPointOffers(this.#point), this.#pointsModel.getPointDestination(this.#point));
    this.#pointEditComponent = new EditPointView(this.#point, this.#pointsModel.offersByType, this.#pointsModel.destinations);

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointComponent.setEditClickHandler(() => {
      this.#replacePointToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setCloseClickHandler(() => {
      this.resetView();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setSubmitHandler((point) => {
      this.#handleDataChange(point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.HandleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
