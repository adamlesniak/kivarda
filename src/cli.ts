#!/usr/bin/env node
import { Command } from 'commander';

import { Kivarda } from './lib/kivarda';

const program = new Command();

program
  .name('kivarda')
  .requiredOption(
    '-t, --text <string>',
    'The text block to parse by Kivarda.',
  )
  .requiredOption('-c, --config <filePath>', 'The YAML file containing configuration.')
  .option('-d, --debug', 'Display debugging.')
  .version('0.1.0')
  .parse();

const options = program.opts();

(async () => {
  const result = await new Kivarda().create(options.text, options.config);

  console.log({
    text: options.text,
    annotations: result.annotations,
    tokens: result.tokens
  });
})();
