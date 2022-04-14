const express = require('express');
const path = require('path');
const logger = require("morgan");
const cors = require('cors');
require("dotenv").config();
require('./config/database')

const usersRouter = require('./app/routes/users');
const shortenerRouter = require('./app/routes/shorteners');
const homeRouter = require('./app/routes/home');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//routs
app.use('/users', usersRouter);
app.use("/shortener", shortenerRouter);
app.use("/", homeRouter);


module.exports = app;