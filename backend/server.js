const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./initDB.js')();

const server =  app.listen(port, async() => {
    console.log('Server: Start')
    console.log(`Port: ${port}`);
});

require("./socket.js")(server);