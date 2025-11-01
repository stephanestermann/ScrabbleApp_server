const express = require("express");
const routes = require('./routes/resultRoutes');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config.js');


console.log("UMGEBUNG:", config.NODE_ENV);
console.log("HOST:", config.HOST);
console.log("PORT:", config.PORT);

const app = express();
app.use(logger('tiny'));
app.use(bodyParser.json());
/**
 * CORS-Config
 */
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);

});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * Routes Definitions
 */
app.use('/', routes);
/**
 * Server Activation
 */
const PORT = process.env.PORT || config.PORT;
app.listen(PORT, config.HOST, () => {
    console.log(
      `Express Server started on http://${config.HOST}:${PORT} | Environment : ${config.NODE_ENV}`
    );
});
module.exports = app;
