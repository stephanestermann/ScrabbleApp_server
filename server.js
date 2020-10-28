/**
 * Required External Modules
 */
const express = require("express");
const routes = require('./routes/resultRoutes');
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
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);

});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', routes);

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(
      `Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
    );
});
module.exports = app;
