import parseFile from './parsers.js';
import buildAst from './ast.js';
import getFormatter from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const tree = buildAst(file1, file2);
  const formatter = getFormatter(formatName);

  return formatter(tree);
};

export default gendiff;
