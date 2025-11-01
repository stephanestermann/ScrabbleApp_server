const routes = require('express').Router();
const postResult = require('./postResult');
const getResult = require('./getResult');

routes.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Der Scrabble-App-Server ist aktiv und betriebsbereit.',
    });
});

routes.post('/api/result/', (req, res, next) => {
    postResult.postResult(req, res)
});

routes.get('/api/results/', (req, res, next) => {
    getResult.getResults(req, res)
});

routes.get('/api/results/summarized', (req, res, next) => {
    getResult.getSummarizedResults(req, res)
});

routes.get('/api/results/downloadDb', (req, res, next) => {
    getResult.getDatabase(req, res, next)
});

routes.get('/api/results/backupDb', (req, res, next) => {
    getResult.backupDatabase(req, res, next)
});

module.exports = routes;