const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./initDB.js')();
require("./route.js")(app);

const server =  app.listen(port, async() => {
    console.log('Server: Start')
    console.log(`Port: ${port}`);
});

const io = require('socket.io')(server, {
    path: '/',
    serveClient: false,
    pingInterval:10000,
    pingTimeout: 5000,
    cookie: false,
    cors: {
        origin: "*",
        methods:["GET", "POST"],
    }
});
io.on("connection", (socket) => {
    console.log("New client connected to socket");
    socket.on("disconnect", () => {
        console.log("disconnect", () =>{
            console.log("client disconnected");
        })
    })
})
const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};
io.on('example_message', function (msg){
    console.log('message: ' + msg)
})


