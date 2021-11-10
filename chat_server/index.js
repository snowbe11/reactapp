
const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const { chatManager } = require('./service');
const socketio = require('socket.io')(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

// 단순한 루프백 핸들링
const bindEventRelayReceived = (socket, socketio, eventName) => {
    socket.on(eventName, eventData => socketio.emit(eventName, eventData));
};

const bindEventChatMessageReceived = (socket, socketio) => {
    socket.on('message', ({name, message}) => {
        chatManager.pushMessage({name, message});

        socketio.emit('message', {name, message});
    });
};

const bindEventGetRank = (socket, socketio) => {
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
    ));
};

const onDisconnect = (socket) => {
    socket.on('disconnect', () => {
        console.log(`disconnected ${socket.id}`);
    });
};

socketio.on('connection', socket => {
    //console.log(socket);
    console.log(`connected with ${socket.id}`);

    // map callbacks
    //bindEventRelayReceived(socket, socketio, 'message');
    bindEventChatMessageReceived(socket, socketio);
    bindEventGetRank(socket, socketio);
});

server.listen(4000, () => {
    console.log('listening on port 4000');
});