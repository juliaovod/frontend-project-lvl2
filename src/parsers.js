import * as path from 'path';
import fs from 'fs';
import jsYaml from 'js-yaml';

const parseFile = (filepath) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), filepath), {
    encoding: 'utf-8',
  });

  const extension = path.extname(filepath);

  switch (extension) {
    case '.yaml':
    case '.yml':
      return jsYaml.load(file);
    case '.json':
      return JSON.parse(file);
    default:
      return null;
  }
};

export default parseFile;
