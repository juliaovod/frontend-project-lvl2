import { Command, Option } from 'commander';
import genDiff from './index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .addOption(
    new Option('-f, --format <type>', 'output format')
      .choices(['stylish', 'plain'])
      .default('stylish'),
  )
  .action((filepath1, filepath2, options) => {
    const { format: formatName } = options;
    const diff = genDiff(filepath1, filepath2, formatName);

    console.log(diff);
  });

program.parse();
