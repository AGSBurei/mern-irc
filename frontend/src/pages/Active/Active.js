import * as React from "react";
import io from "socket.io-client";
import swal from 'sweetalert';

const active = (props) => {
    require('./style.css');

    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const session = () => {
        for ( let i = 0; i < 10; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }

    session();

    const socket = new io("http://localhost:5000");

    socket.emit('active', props.match.params, result);

    socket.on(result, (request, message) => {
        swal(request, message, request);
    });

    return (
        <div class="message">
            <h1>Your account is active </h1>
            <h2>Click <a href="http://localhost:3000/">here</a> to return to the site</h2>
        </div>
    )
}

export default active;
