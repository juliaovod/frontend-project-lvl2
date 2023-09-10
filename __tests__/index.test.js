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

describe('test json files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  test('formatter stylish', () => {
    const actual = gendiff(filepath1, filepath2, 'stylish');
    expect(actual).toBe(expectedStylishDiff);
  });

  test('formatter plain', () => {
    const actual = gendiff(filepath1, filepath2, 'plain');
    expect(actual).toBe(expectedPlainDiff);
  });

  test('formatter json', () => {
    const actual = gendiff(filepath1, filepath2, 'json');
    expect(JSON.parse(actual)).toStrictEqual(expectedJsonDiff);
  });
});

describe('test yaml files', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');

  test('formatter stylish', () => {
    const actual = gendiff(filepath1, filepath2, 'stylish');
    expect(actual).toBe(expectedStylishDiff);
  });

  test('formatter plain', () => {
    const actual = gendiff(filepath1, filepath2, 'plain');
    expect(actual).toBe(expectedPlainDiff);
  });

  test('formatter json', () => {
    const actual = gendiff(filepath1, filepath2, 'json');
    expect(JSON.parse(actual)).toStrictEqual(expectedJsonDiff);
  });
});
