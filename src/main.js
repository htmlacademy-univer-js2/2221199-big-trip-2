import Trip from './presenter/trip';
import {render} from './framework/render';
import FilterView from './view/filter';
import PointsModel from './model/point';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new Trip(tripContainer, pointsModel);

render(new FilterView(), filterContainer);
tripPresenter.init();
