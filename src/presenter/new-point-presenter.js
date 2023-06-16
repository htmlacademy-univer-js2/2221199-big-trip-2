import EditPointView from '../view/point-edit-view';
import {remove, render, RenderPosition} from '../framework/render';
import {UpdateType, UserAction} from '../utils/consts';
import {nanoid} from 'nanoid';

export default class NewPointPresenter {
  #tripListContainer = null;
  #pointEditComponent = null;
  #pointsModel = null;
  #handleDataChange = null;

  #handleDestroy = null;

  constructor(tripListContainer, pointsModel, onChangeData, onDestroy) {
    this.#tripListContainer = tripListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onChangeData;
    this.#handleDestroy = onDestroy;
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      offersByType: this.#pointsModel.offersByType,
      destinations: this.#pointsModel.destinations
    });
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setCloseClickHandler(this.#handleCloseClick);

    render(this.#pointEditComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {id: nanoid(), ...point}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleCloseClick = () => {
    this.destroy();
  };
}
