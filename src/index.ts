import express from 'express';
import proxy from 'http-proxy-middleware';

const app = express();

app.use(
  '/identifi',
  proxy({
    target: 'http://localhost:3000',
    pathRewrite: (path) => path.replace(/\/identifi/, ''),
  }),
);

app.use(
  '/mock',
  proxy({
    target: 'http://localhost:3001',
    pathRewrite: (path) => path.replace(/\/mock/, ''),
  }),
);

app.listen(8000);
