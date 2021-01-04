const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

require('./initDB')();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});