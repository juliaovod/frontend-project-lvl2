import _ from 'lodash';
import { diffStatus } from '../ast.js';

const stringify = (value, replacer = ' ', spacesCount = 1, currentDepth = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = spacesCount * depth;
    const currentIndent = replacer.repeat(indentSize);
    const backBracketIndent = replacer.repeat(indentSize - spacesCount);

    const line = Object.entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return `{\n${line.join('\n')}\n${backBracketIndent}}`;
  };

  return iter(value, currentDepth);
};

const stylish = (diffAst) => {
  const spacesCount = 4;
  const replacer = ' ';

  const iter = (tree, depth) => {
    const indentSize = depth * spacesCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const closeBracketIndent = replacer.repeat(depth * spacesCount - spacesCount);

    const lines = tree.flatMap((currentNode) => {
      const { key, status, children } = currentNode;

      if (children) {
        return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
      }

      const oldValue = stringify(currentNode.oldValue, replacer, spacesCount, depth + 1);
      const newValue = stringify(currentNode.newValue, replacer, spacesCount, depth + 1);

      switch (status) {
        case diffStatus.updated:
          return [
            `${currentIndent}- ${key}: ${oldValue}`,
            `${currentIndent}+ ${key}: ${newValue}`,
          ];
        case diffStatus.added:
          return `${currentIndent}+ ${key}: ${newValue}`;
        case diffStatus.removed:
          return `${currentIndent}- ${key}: ${oldValue}`;
        default:
          return `${currentIndent}  ${key}: ${newValue}`;
      }
    });

    return [
      '{',
      ...lines,
      `${closeBracketIndent}}`,
    ].join('\n');
  };

  return iter(diffAst, 1);
};

export default stylish;
