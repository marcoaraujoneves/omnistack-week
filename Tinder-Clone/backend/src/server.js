/**
 * This file:
 * - Defines a socket id associated with the id of the user that established the connection;
 * - Connects with the MongoDB Atlas test cluster;
 * - Inserts on the request body the Socket and the connected users, and,
 * - Defines that the HTTP Server uses CORS, JSON and the Routes of routes.js
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const httpServer = express();
const server = require('http').Server(httpServer);

const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

mongoose.connect('INSERT_URI_HERE', {
    useNewUrlParser: true
});

httpServer.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(3333);
