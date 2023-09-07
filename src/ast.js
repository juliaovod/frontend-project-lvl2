import _ from 'lodash';

export const NODE_STATUS = {
  ADDED: 'ADDED',
  REMOVED: 'REMOVED',
  UNMODIFIED: 'UNMODIFIED',
  UPDATED: 'UPDATED',
};

const buildAst = (json1, json2) => {
  const iter = (obj1, obj2, accum, depth) => {
    const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      const oldValue = obj1[key];
      const newValue = obj2[key];

      const node = { key, depth };

      if (_.hasIn(obj1, key) && _.hasIn(obj2, key)) {
        if (_.isObject(oldValue) && _.isObject(newValue)) {
          accum.push({
            ...node,
            children: iter(oldValue, newValue, [], depth + 1),
          });
        } else {
          const status = oldValue !== newValue ? NODE_STATUS.UPDATED : NODE_STATUS.UNMODIFIED;
          accum.push({
            ...node, oldValue, newValue, status,
          });
        }
      } else if (_.hasIn(obj1, key)) {
        accum.push({ ...node, oldValue, status: NODE_STATUS.REMOVED });
      } else {
        accum.push({ ...node, newValue, status: NODE_STATUS.ADDED });
      }
    }

    return accum;
  };

  return iter(json1, json2, [], 1);
};

export default buildAst;
