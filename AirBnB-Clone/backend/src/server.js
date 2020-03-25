const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();

const server = http.Server(app);
const io = socketio(server);

// Connecting to the MongoDB cluster
mongoose.connect('PASTE_HERE_THE_URL', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// The method below is not the best way to control the connected users in an application, it would be better to use Redis
const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers;

    return next();
});

/*
    Main HTTP verbs GET, POST, PUT, DELETE
    request.query.x : to access query parameters on the URL (used for GET filters)
    request.params.x : to access route parameters on the URL (used for PUT and DELETE)
    request.body : to access the request body (usually a JSON Object) 
*/

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);