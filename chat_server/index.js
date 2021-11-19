const express = require("express");
const session = require("express-session");
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { passport } = require("./service");

// passport
app.use(
  session({
    secret: "@react",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// call back to all
app.use((req, res, next) => {
  console.log(
    `app.use custom callback, isAuthenticated=${req.isAuthenticated()} currentUser=${JSON.stringify(
      req.user
    )}`
  );

  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;

  next();
});

// router setting
const apiRouter = require("./router");
app.use("/api", apiRouter);

const server = require("http").createServer(app);

//const cors = require("cors");
const socketio = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// server content

const { chatManager } = require("./service");

// 단순한 루프백 핸들링
const bindEventRelayReceived = (socket, socketio, eventName) => {
  socket.on(eventName, (eventData) => socketio.emit(eventName, eventData));
};

const bindEventChatMessageReceived = (socket, socketio) => {
  socket.on("message", ({ name, message }) => {
    chatManager.pushMessage({ name, message });

    // debug
    console.log("socket.on message");
    let context = chatManager.getMessage();
    console.log(context.slice(-1)[0]);

    socketio.emit("message", context.slice(-1)[0]);
  });
};

const onDisconnect = (socket) => {
  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });
};

socketio.on("connection", (socket) => {
  //console.log(socket);
  console.log(`connected with ${socket.id}`);

  // map callbacks
  bindEventRelayReceived(socket, socketio, "echo");
  bindEventChatMessageReceived(socket, socketio);
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
