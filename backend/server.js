import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

import { version } from './package.json';
import apiRoutes from './src/routes';

const app = express();

// Load environment vars
dotenv.config();
const { DB_CONNECT } = process.env;

// eslint-disable-next-line consistent-return
const startServer = async () => {
  // Connect to DB
  try {
    await mongoose.connect(`${DB_CONNECT}`);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
    console.error('Unable to connect to MongoDB');
    return process.exit(126);
  }

  // Middlewares
  app.use(bodyParser.json());
  app.use(cors());
  app.use(compression());
  app.use(morgan('dev')); // Deprecation warning is because of https://github.com/expressjs/morgan/issues/190

  // Routes
  app.get('/', (_req, res) => {
    res.json({
      name: 'Carleton Web Dev Club RESTful API',
      version,
      docs: 'https://carleton-web-dev-club.github.io/club-site-api/',
    });
  });

  app.use(apiRoutes);

  // 404 errors
  app.use((_res, _req, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  // Error handler (all errors are passed to this)
  app.use(({ message, status }, { method, path }, res, next) => {
    res.status(status || 500).json({
      error: true,
      request: { method, path },
      message,
    });
    next();
  });

  // Server
  app.listen(5000, () => {
    console.log('Server ready at http://localhost:5000/');
  });
};

startServer();
