const routes = require('express').Router();

routes.get('/', (req, res) => {
    
    res.status(200).json({ message: 'I have changed the Output' });
});
module.exports = routes;