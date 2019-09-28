import test from 'ava';
import { initApp, executeQuery } from './app';

test.before(async () => {
  await initApp();
});

test('should retrieve users', async (t) => {
  const res = await executeQuery({
    query: `
      query {
        res: users { id, email }
      }
    `,
    variables: {},
  });

  t.is(res.length, 2);
});
