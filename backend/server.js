require('dotenv').config();
const { HTTP_PORT } = process.env;
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
console.log(HTTP_PORT)
server.listen(HTTP_PORT);
