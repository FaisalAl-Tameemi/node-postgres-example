'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/**
Step 1: require the `pg` or `pg-then` package
*/
const pg = require('pg');
// const pg = require('pg-then');

/**
Step 2: setups a DB pool or client instance
*/
const db = new pg.Pool(require('./config/db'));
// const db = pg.Client(db_uri);

const app = express();

/**
Step 3: require the routes and pass the db instance to each
*/
const base_routes = require('./routes/index')(db);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', base_routes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// module.exports = app;
