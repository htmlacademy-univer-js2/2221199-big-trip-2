import PointView from '../view/point';
import EditPointView from '../view/point-edit';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction} from '../utils/consts';
import {isDateEqual} from '../utils/util';

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

    this.#pointComponent = new PointView(this.#point, this.#pointsModel.offersByType, this.#pointsModel.destinations);
    this.#pointEditComponent = new EditPointView(this.#point, this.#pointsModel.offersByType, this.#pointsModel.destinations);

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setCloseClickHandler(this.#handleCloseClick);
    this.#pointEditComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

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

  #handleDeleteClick = (task) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      task,
    )
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
      document.removeEventListener('keydown', this.#handleEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleCloseClick = () => {
    this.resetView();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDateEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDateEqual(this.#point.dateTo, update.dateTo) ||
      this.#point.basePrice !== update.basePrice;
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };
}
