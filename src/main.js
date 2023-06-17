import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/point-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';
import NewPointButtonView from './view/new-point-button-view';
import {render, RenderPosition} from './framework/render';
import TripNavigationView from './view/trip-navigation-view';

const AUTHORIZATION = 'Basic qkllk12312qqq';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripContainer, headerContainer, pointsModel, filterModel, );
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

const newPointButtonComponent = new NewPointButtonView();
const tripNavigationView = new TripNavigationView();


tripPresenter.init();
filterPresenter.init();
render(tripNavigationView, navigationContainer, RenderPosition.AFTERBEGIN);
pointsModel.init().finally(() => {
  render(newPointButtonComponent, headerContainer);
  newPointButtonComponent.setButtonClickHandler(() => {
    tripPresenter.createPoint(() => { newPointButtonComponent.element.disabled = false; });
    newPointButtonComponent.element.disabled = true;
  });
});
