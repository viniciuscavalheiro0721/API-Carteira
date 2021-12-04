require('dotenv').config();
const http = require('http');
const app = require('./app');
const port = process.env.PORT;
const server = http.createServer(app);
// const server = http.createServer((req,res) =>{

// res.end(JSON.stringify({
// server: "teste"
// }));

// });
server.listen(port);

