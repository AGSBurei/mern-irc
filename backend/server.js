const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

require('./initDB')();

app.listen(port, () => {
    console.log('Server : Start')
    console.log(`Port: ${port}`);
});