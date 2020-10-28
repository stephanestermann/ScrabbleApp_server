const routes = require('express').Router();

routes.get('/', (req, res) => {
    
    res.status(200).json({ message: 'Soon, I will save here the Scrabbledata :-)' });
});
module.exports = routes;