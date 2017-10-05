import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';

// import favicon from 'serve-favicon';
import path from 'path';
// import Models
import './models/card';
import './models/board';
import './models/link';
import './models/user';
import passport from './controllers/passport';

// import Routes

import index from './routes/index';
import cards from './routes/cards';
import boards from './routes/boards';
import links from './routes/links';
import users from './routes/users';

const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];


mongoose.connect(config.database.url, {
  useMongoClient: true,
});


const debug = Debug('marky:app');
app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'pug');
mongoose.Promise = global.Promise;

// Middlewares

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


// Routes

app.use('/', index);
app.use('/boards', boards);
app.use('/cards', cards);
app.use('/links', links);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
