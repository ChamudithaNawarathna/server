const serverless = require('serverless-http');
const app = require('../src/index'); // assuming your Express app is exported from src/index.js

module.exports.handler = serverless(app);
