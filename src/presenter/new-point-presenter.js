import EditPointView from '../view/point-edit-view';
import {remove, render, RenderPosition} from '../framework/render';
import {UpdateType, UserAction} from '../utils/consts';

export default class NewPointPresenter {
  #tripListContainer = null;
  #pointEditComponent = null;
  #pointsModel = null;
  #dataChangeHandler = null;

  #destroyHandler = null;

  constructor(tripListContainer, pointsModel, dataChangeHandler) {
    this.#tripListContainer = tripListContainer;
    this.#pointsModel = pointsModel;
    this.#dataChangeHandler = dataChangeHandler;
  }

  init = (callback) => {
    this.#destroyHandler = callback;
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      offersByType: this.#pointsModel.offersByType,
      destinations: this.#pointsModel.destinations,
      isNewPoint: true
    });
    this.#pointEditComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#pointEditComponent.setDeleteClickHandler(this.#deleteClickHandler);
    this.#pointEditComponent.setCloseClickHandler(this.#closeClickHandler);

    render(this.#pointEditComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyHandler();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFromState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#pointEditComponent.shake(resetFromState);
  };

  #formSubmitHandler = (point) => {
    this.#dataChangeHandler(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #deleteClickHandler = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #closeClickHandler = () => {
    this.destroy();
  };
}
