import { App } from './server';
import { routes } from './routes';

const { HOST = 'localhost', PORT = 8000 } = process.env;

const app = new App({
  host: HOST,
  port: +PORT,
  routes,
});

app.start();
