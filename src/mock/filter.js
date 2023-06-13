import {filters} from '../utils/filter';

const generateFilter = (points) => Object.entries(filters).map(
  ([filterName, filter]) => ({
    name: filterName,
    filteredPoints: filter(points)
  })
);

export default generateFilter;
