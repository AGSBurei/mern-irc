const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

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

const io = require("socket.io")(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});