require('dotenv').config();

module.exports = (to, id) => {
    const send = require('gmail-send')({
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        to: to,
        subject: 'Active your account',
    });

    send({
        html: '<p>Click <a href="http://localhost:3000/Active/' + id + '">here</a> to active your account</p>',  
    }, (error, result, fullResult) => {
        if (error){
            console.error(error);
        } 
    })
}
