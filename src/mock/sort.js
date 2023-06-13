import {sorts} from '../utils/util';

const generateSorts = (points) => Object.entries(sorts).map(
  ([name, sort]) => ({
    name,
    sortedPoints: sort(points),
  }),
);

export default generateSorts;
