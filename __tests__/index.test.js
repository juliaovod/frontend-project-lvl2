import * as path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylishDiff = parseFile(getFixturePath('diff1.stylish.txt')).trim();
const expectedPlainDiff = parseFile(getFixturePath('diff1.plain.txt')).trim();

describe('test json files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  test('format stylish', () => {
    const actual = genDiff(filepath1, filepath2, 'stylish');
    expect(actual).toBe(expectedStylishDiff);
  });

  test('format plain', () => {
    const actual = genDiff(filepath1, filepath2, 'plain');
    expect(actual).toBe(expectedPlainDiff);
  });
});

describe('test yaml files', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');

  test('format stylish', () => {
    const actual = genDiff(filepath1, filepath2, 'stylish');
    expect(actual).toBe(expectedStylishDiff);
  });

  test('format plain', () => {
    const actual = genDiff(filepath1, filepath2, 'plain');
    expect(actual).toBe(expectedPlainDiff);
  });
});
