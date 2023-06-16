import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/point-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic 20hoursofPuDgebeatbox'
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripContainer, headerContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();
