import {filters} from '../utils/util';

const generateFilters = (points) => Object.entries(filters).map(
  ([name, filter]) => ({
    name,
    filteredPoints: filter(points)
  })
);

export default generateFilters;
