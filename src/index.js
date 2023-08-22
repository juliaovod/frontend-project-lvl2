import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const keys = _.sortBy(Object.keys({ ...file1, ...file2 }));

  const result = [];

  keys.forEach((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (_.has(file1, key) && _.has(file2, key)) {
      if (value1 === value2) {
        result.push([' ', key, value1]);
      } else {
        result.push(['-', key, value1]);
        result.push(['+', key, value2]);
      }
    } else if (_.has(file1, key)) {
      result.push(['-', key, value1]);
    } else {
      result.push(['+', key, value2]);
    }
  });

  const data = result.reduce((accum, [mark, key, value]) => {
    accum[`${mark} ${key}`] = value;
    return accum;
  }, {});

  return JSON.stringify(data, null, 2).replace(/[",]/g, '');
};

export default genDiff;
