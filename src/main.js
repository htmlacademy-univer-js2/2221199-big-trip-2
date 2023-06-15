import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/point-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewPointButtonView from './view/new-point-button-view';
import {render, RenderPosition} from './framework/render';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const newPointButtonComponent = new NewPointButtonView();

const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel, () => { newPointButtonComponent.element.disabled = false; });
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

newPointButtonComponent.setButtonClickHandler(() => {
  tripPresenter.createTask();
  newPointButtonComponent.element.disabled = true;
});

render(newPointButtonComponent, headerContainer, RenderPosition.BEFOREEND);

tripPresenter.init();
filterPresenter.init();
