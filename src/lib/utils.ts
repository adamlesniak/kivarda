import * as fs from 'fs';

import { parse } from 'yaml';

/**
 * @returns parsed CSV using csv-parse.
 *
 * @param string filePath
 */
export const readYaml = async <T>(filePath: string): Promise<T> =>
  parse(await fs.readFileSync(filePath, { encoding: 'utf-8' }));
