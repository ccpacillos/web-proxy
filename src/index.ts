import path from 'path';
import assert from 'assert';
import express from 'express';
import proxy from 'http-proxy-middleware';
import json from 'load-json-file';
import Promise from 'bluebird';
import R from 'ramda';

const app = express();

async function start() {
  const config: any = await json(path.join(process.cwd(), 'services.json'));

  if (!config || !config.services) {
    throw new Error('Invalid services.json config file.');
  }

  R.forEach((service: any) => {
    assert(typeof service.route === 'string');
    assert(typeof service.target === 'string');
  }, config.services);

  await Promise.map(
    config.services,
    async (service: any) => {
      app.use(
        service.route as string,
        proxy({
          target: service.target as string,
          pathRewrite: (path) => path.replace(/${route}`/, ''),
        }),
      );
    },
    {
      concurrency: 5,
    },
  );

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`App listening at port: ${port}`);
}

start();
