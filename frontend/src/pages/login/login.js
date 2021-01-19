import * as React from "react";

const axios = require('axios');

const loginTo = () => { 
    axios.get('http://localhost:5000/user', {
        params: {
            mail:"a",
            password:"a",
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    }).then(function () {
        // always executed
    });
}

const login = () => {   
    return(
        <div>
            <div>
                <label>email :</label>
                <input type="text"></input>
            </div>

            <div>
                <label>password :</label>
                <input type="text"></input>
            </div>

            <div>
                <button onClick={loginTo()}>login</button>
            </div>
        </div>
    )
}

export default login;