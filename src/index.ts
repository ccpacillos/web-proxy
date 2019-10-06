import { App } from './server';
import { routes } from './routes';

const {
  HOST = 'localhost',
  PORT = 8000,
  MYSQL_PASSWORD = 'password',
  MYSQL_USER = 'root',
  MYSQL_DATABASE = 'Mock',
  MYSQL_HOST = 'localhost',
  MYSQL_PORT = 3306,
  MYSQL_LOGGING = 0,
} = process.env;

const app = new App({
  host: HOST,
  port: +PORT,
  routes,
  mysql: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    port: +MYSQL_PORT,
    logging: !!+MYSQL_LOGGING,
  },
});

app.start();
