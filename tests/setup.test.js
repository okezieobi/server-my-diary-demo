import 'jest-chain';
import 'jest-extended';

import umzug from '../src/utils/umzug';

beforeEach(async () => {
  await umzug.migrations.down();
  await umzug.migrations.up();
});
