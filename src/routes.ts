import Router from 'koa-router';
import compose from 'koa-compose';

const router = new Router({
  prefix: '/api',
});

router.get('/temp', (ctx) => {
  ctx.body = { success: true };
});

export const routes = compose([router.routes(), router.allowedMethods()]);
