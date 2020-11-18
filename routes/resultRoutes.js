const routes = require('express').Router();
const postResult = require('./postResult');
const getResult = require('./getResult');

routes.post('/api/result/', (req, res, next) => {
    postResult.postResult(req, res)
});

routes.get('/api/results/', (req, res, next) => {
    getResult.getResults(req, res)
});

routes.get('/api/results/downloadDb', (req, res, next) => {
    getResult.getDatabase(req, res, next)
});


module.exports = routes;