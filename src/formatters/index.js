import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

export default getFormatter;
