import * as path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixtureFile = (filename) => parseFile(getFixturePath(filename));

const expectedStylishDiff = getFixtureFile('diff1.stylish.txt').trim();
const expectedPlainDiff = getFixtureFile('diff1.plain.txt').trim();
const expectedJsonDiff = getFixtureFile('diff1.json');

describe('test gendiff', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const filepath3 = getFixturePath('file1.yaml');
  const filepath4 = getFixturePath('file2.yaml');

  test('formatter stylish', () => {
    const actual1 = gendiff(filepath1, filepath2, 'stylish');
    const actual2 = gendiff(filepath3, filepath4, 'stylish');

    expect(actual1).toBe(expectedStylishDiff);
    expect(actual2).toBe(expectedStylishDiff);
  });

  test('formatter plain', () => {
    const actual1 = gendiff(filepath1, filepath2, 'plain');
    const actual2 = gendiff(filepath3, filepath4, 'plain');

    expect(actual1).toBe(expectedPlainDiff);
    expect(actual2).toBe(expectedPlainDiff);
  });

  test('formatter json', () => {
    const actual1 = gendiff(filepath1, filepath2, 'json');
    const actual2 = gendiff(filepath3, filepath4, 'json');

    expect(JSON.parse(actual1)).toStrictEqual(expectedJsonDiff);
    expect(JSON.parse(actual2)).toStrictEqual(expectedJsonDiff);
  });
});
