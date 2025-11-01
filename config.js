const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

const currentEnv = process.env.NODE_ENV || 'development';

module.exports = {
    NODE_ENV: currentEnv,
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000
}