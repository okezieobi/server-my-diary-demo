import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import routes from './routes/router';
import swaggerSpec from './utils/swagger';
import umzug from './utils/umzug';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/v1', routes);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.status) res.status(error.status).json({ error });
  else next(error);
});

(async () => {
  await umzug.migrations.up();
})();

export default app;
