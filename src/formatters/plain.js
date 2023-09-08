import _ from 'lodash';
import { diffStatus } from '../ast.js';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return `${value}`;
};

const plain = (diffAst) => {
  const iter = (tree, depth, paths) => {
    const lines = tree.flatMap((currentNode) => {
      const { key, status, children } = currentNode;

      const oldValue = stringify(currentNode.oldValue);
      const newValue = stringify(currentNode.newValue);

      const currentPaths = [...paths, key];

      if (children) {
        return iter(children, depth + 1, currentPaths);
      }

      switch (status) {
        case diffStatus.updated:
          return `Property '${currentPaths.join('.')}' was updated. From ${oldValue} to ${newValue}`;
        case diffStatus.added:
          return `Property '${currentPaths.join('.')}' was added with value: ${newValue}`;
        case diffStatus.removed:
          return `Property '${currentPaths.join('.')}' was removed`;
        default:
          return null;
      }
    });

    return lines.filter(Boolean).join('\n');
  };

  return iter(diffAst, 1, []);
};

export default plain;
