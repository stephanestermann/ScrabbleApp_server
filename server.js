/**
 * Required External Modules
 */
const express = require("express");
const testRoute = require('./routes/test');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require("path");

/**
 * App Variables
 */
const app = express();
const PORT = process.env.PORT || "3000";
const NODE_ENV = process.env.NODE_ENV || 'development';


/**
 *  App Configuration
 */
app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(logger('tiny'));
app.use(bodyParser.json());

/**
 * Routes Definitions
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', testRoute);



/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(
      `Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
    );
});
module.exports = app;