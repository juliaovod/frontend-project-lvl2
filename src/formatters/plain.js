import _ from 'lodash';
import { diffStatus } from '../ast.js';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : `${value}`;
};

const makeLine = (node, paths) => {
  const { status, oldValue, newValue } = node;

  const currentPaths = paths.join('.');
  const value1 = stringify(oldValue);
  const value2 = stringify(newValue);

  switch (status) {
    case diffStatus.updated:
      return `Property '${currentPaths}' was updated. From ${value1} to ${value2}`;
    case diffStatus.added:
      return `Property '${currentPaths}' was added with value: ${value2}`;
    case diffStatus.removed:
      return `Property '${currentPaths}' was removed`;
    default:
      return null;
  }
};

const plain = (diffAst) => {
  const iter = (tree, depth, paths) => {
    const lines = tree.flatMap((node) => {
      const { key, children } = node;

      const currentPaths = [...paths, key];

      if (children) {
        return iter(children, depth + 1, currentPaths);
      }

      return makeLine(node, currentPaths);
    }, []);

    return lines.filter(Boolean).join('\n');
  };

  return iter(diffAst, 1, []);
};

export default plain;
