const http = require('http');
// const express = require('express');
const app = require('./app');
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => res.send('Hello World!'))
const server = http.createServer(app);
server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//  server.listen(port);