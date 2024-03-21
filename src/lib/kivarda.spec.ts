import test from 'ava';

import { Kivarda } from './kivarda';

test('kivarda should return expected tokens and annotations', async (t) => {
  const kivarda = await new Kivarda().create(
    'TFI Local Link provides local public transport in rural areas nationwide where other services are limited. The services are low-cost and available for anyone ...',
    './examples/categories.yml',
  );

  t.deepEqual(kivarda.annotations, [
    { text: 'public', start: 30, end: 36, label: 'commute' },
    { text: 'transport', start: 37, end: 46, label: 'commute' },
  ]);
});
