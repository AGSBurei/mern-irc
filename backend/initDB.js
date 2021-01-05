const mongoose = require('mongoose');

module.exports = () => {
    const uri = process.env.DB_URI;

    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log("MongoDB : database connection");
    })

    connection.on('error', (error) => {
        console.error(error.message);
    })

    connection.on('disconnected', () => {
        console.log("MongoDB : database disconnected");
    })
}