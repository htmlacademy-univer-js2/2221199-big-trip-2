import Trip from './presenter/trip';
import {render} from './render';
import FilterView from './view/filter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip(tripContainer);

render(new FilterView(), filterContainer);
tripPresenter.init();
