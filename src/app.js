import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import routes from './routes/router';
import swaggerSpec from './utils/swagger';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/v1', routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (res.status !== 500) res.status(400).json({ error: err });
  else next(err);
});

export default app;
