module.exports = (to, id) => {
    const send = require('gmail-send')({
        user: 'anti.rain1999@gmail.com',
        pass: 'ANTI-rain68100&*',
        to: to,
        subject: 'Active your account',
    });

    send({
        html: '<p>Click <a href="http://localhost:5000/User/Active/' + id + '">here</a> to active your account</p>',  
    }, (error, result, fullResult) => {
        if (error){
            console.error(error);
        } 
    })
}
