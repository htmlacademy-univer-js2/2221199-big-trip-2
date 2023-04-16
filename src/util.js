const getRandomInRange = (start, end) => start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;

export {getRandomInRange};
