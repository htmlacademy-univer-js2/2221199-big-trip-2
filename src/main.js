import TripPresenter from './presenter/trip-presenter';
import {render} from './framework/render';
import FilterView from './view/filter';
import PointsModel from './model/point';
import generateFilters from './mock/filter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripContainer, pointsModel);
const filters = generateFilters(pointsModel.points);

render(new FilterView(filters), filterContainer);
tripPresenter.init();
