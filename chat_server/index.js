//import { Event } from './src/event';

const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const socketio = require('socket.io')(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

const eventRelayReceived = (socket, socketio, eventName) => {
    socket.on(eventName, eventData => socketio.emit(eventName, eventData))
}

const eventGetRank = (socket, socketio) => {
    socket.on('get rank', eventData => socketio.emit('rank', 
        {
            message: 'rank from server',
            rank: [
                {name: 'rophead', score: 1919},
                {name: 'jar', score: 1872},
                {name: 'trfg', score: 1334},
                {name: 'snowbe11', score: 1123},
                {name: 'jar-head', score: 892},
                {name: 'stike-LD', score: 516},
            ]
        }
    ))
}

socketio.on('connection', socket => eventRelayReceived(socket, socketio, 'message'));
socketio.on('connection', socket => eventGetRank(socket, socketio));

server.listen(4000, () => {
    console.log('listening on port 4000');
})