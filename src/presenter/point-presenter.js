import PointView from '../view/point-view';
import EditPointView from '../view/point-edit-view';
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
  #dataChangeHandler = null;
  #modeChangeHandler = null;
  #mode = Mode.DEFAULT;

  constructor(tripListContainer, pointsModel, dataChangeHandler, modeChangeHandler) {
    this.#tripListContainer = tripListContainer;
    this.#pointsModel = pointsModel;
    this.#dataChangeHandler = dataChangeHandler;
    this.#modeChangeHandler = modeChangeHandler;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(this.#point, this.#pointsModel.offersByType, this.#pointsModel.destinations);
    this.#pointEditComponent = new EditPointView({
      point: point,
      destinations: this.#pointsModel.destinations,
      offersByType: this.#pointsModel.offersByType,
    });

    this.#pointComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#pointComponent.setEditClickHandler(this.#editClickHandler);
    this.#pointEditComponent.setCloseClickHandler(this.#closeClickHandler);
    this.#pointEditComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#pointEditComponent.setDeleteClickHandler(this.#deleteClickHandler);

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

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    const resetFromState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFromState);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#modeChangeHandler();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #deleteClickHandler = (point) => {
    this.#dataChangeHandler(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #favoriteClickHandler = () => {
    this.#dataChangeHandler(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #editClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #closeClickHandler = () => {
    this.resetView();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #formSubmitHandler = (update) => {
    const isMinorUpdate =
      !isDateEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDateEqual(this.#point.dateTo, update.dateTo) ||
      this.#point.basePrice !== update.basePrice;
    this.#dataChangeHandler(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
