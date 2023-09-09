import _ from 'lodash';

export const diffStatus = {
  added: 'added',
  removed: 'removed',
  unmodified: 'unmodified',
  updated: 'updated',
};

const buildAst = (json1, json2) => {
  const iter = (obj1, obj2, depth) => {
    const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

    return keys.map((key) => {
      const oldValue = obj1[key];
      const newValue = obj2[key];

      const node = { key, level: depth };

      if (_.hasIn(obj1, key) && _.hasIn(obj2, key)) {
        if (_.isObject(oldValue) && _.isObject(newValue)) {
          return {
            ...node,
            children: iter(oldValue, newValue, depth + 1),
          };
        }

        const status = oldValue !== newValue ? diffStatus.updated : diffStatus.unmodified;
        return {
          ...node,
          oldValue,
          newValue,
          status,
        };
      }

      return _.hasIn(obj1, key)
        ? { ...node, oldValue, status: diffStatus.removed }
        : { ...node, newValue, status: diffStatus.added };
    });
  };

  return iter(json1, json2, 1);
};

export default buildAst;
