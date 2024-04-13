require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const { requestLogger } = require('./support/logger');
// const {EventEmitter} = require('events')

// EventEmitter.defaultMaxListeners = 100

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credential: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

// error handler
require('express-async-errors');

const {
    errorHandler,
    badJsonHandler,
    notFoundHandler,
} = require('./middlewares');

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(requestLogger);

// parse json body
app.use(express.json());

// handle json format
app.use(badJsonHandler);

// load routes
require('./loaders/routes')(app);

// load and validate env variables
require('./loaders/config');

// handle 404 error
app.use(notFoundHandler);

// catch all errors
app.use(errorHandler);

module.exports = app;
