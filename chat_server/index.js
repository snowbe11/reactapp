
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

const apiRouter = require('./router');

// express setting
app.use('/api', apiRouter);

// 단순한 루프백 핸들링
const bindEventRelayReceived = (socket, socketio, eventName) => {
    socket.on(eventName, eventData => socketio.emit(eventName, eventData));
};

const bindEventChatMessageReceived = (socket, socketio) => {
    socket.on('message', ({name, message}) => {
        chatManager.pushMessage({name, message});

        // debug
        let context = chatManager.getMessage();
        console.log(context);

        socketio.emit('message', {name, message});
    });
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
    bindEventRelayReceived(socket, socketio, 'echo');
    bindEventChatMessageReceived(socket, socketio);
});

server.listen(4000, () => {
    console.log('listening on port 4000');
});