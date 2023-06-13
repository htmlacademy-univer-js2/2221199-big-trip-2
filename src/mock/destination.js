import {getRandomInRange} from '../utils/util';
import {DESTINATIONS_COUNT} from '../utils/consts';

const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui'];

const CITIES = ['London', 'Tokio', 'Akinawa', 'City17', 'Mondstadt'];

const generatePhoto = () => ({
  'src': `http://picsum.photos/248/152?r=${getRandomInRange(1, 9999)}`,
  'description': DESCRIPTIONS[getRandomInRange(0, DESCRIPTIONS.length - 1)],
});

const generateDestination = (id) => ({
  id,
  'description': DESCRIPTIONS[getRandomInRange(0, DESCRIPTIONS.length - 1)],
  'name': CITIES[getRandomInRange(0, CITIES.length - 1)],
  'pictures': Array.from({length: getRandomInRange(1, 5)}, generatePhoto),
});

const destinations = Array.from({length: DESTINATIONS_COUNT}, (_, i) => generateDestination(i));

export default destinations;
