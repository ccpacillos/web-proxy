import Router from 'koa-router';
import compose from 'koa-compose';
import { validate } from './validators/validate';
import { createUserInput } from './validators/user';
import { Users } from './orm/models/user';
import { APIError, ErrorCode } from './error';

const router = new Router({
  prefix: '/api',
});

router.post('/users', async (ctx) => {
  const { valid, error } = await validate(createUserInput, ctx.request.body);

  if (!valid) {
    throw new APIError({
      message: error,
      code: ErrorCode.ERR_INPUT_VALIDATION,
    });
  }

  const { email } = ctx.request.body;
  const [, created] = await Users().findOrCreate(
    {
      email,
    },
    {
      email,
    },
  );

  if (!created) {
    throw new APIError({
      message: 'Email already exists.',
      code: ErrorCode.ERR_DUPLICATE_ENTRY,
    });
  }
  ctx.body = { success: true };
});

export const routes = compose([router.routes(), router.allowedMethods()]);
