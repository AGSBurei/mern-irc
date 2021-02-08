import * as React from "react";
import io from "socket.io-client";
import swal from 'sweetalert';

const login = () => {
    require('./style.css');

    let b = true;
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const socket = new io("http://localhost:5000");

    const session = () => {
        for ( let i = 0; i < 10; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }

    session();

    const show = () => {
        if(b){
            document.getElementById("login").style.display = "none";
            document.getElementById("signup").style.display = "block";
            b = false;
        }else{
            document.getElementById("login").style.display = "block";
            document.getElementById("signup").style.display = "none";
            b = true;
        }
    }

    const login = () => {
        socket.emit('login', document.getElementById("loginEmail").value, document.getElementById("loginPassword").value, result);
    }

    const signup = () => {
        socket.emit('signup', document.getElementById("signupName").value, document.getElementById("signupEmail").value, document.getElementById("signupPassword").value, document.getElementById("signupPasswordConfirm").value, result);
    }

    if(localStorage.getItem("token") != null || localStorage.getItem("token") != ""){
        socket.emit('token', localStorage.getItem("token"), result);
    }

    socket.on(result, (request, message) => {
        if(message == "removeToken"){
            localStorage.removeItem("token");
        }else{
            switch (request) {
                case "error", "success":
                    swal(request, message, request);
                    break;
    
                case "token":
                    localStorage.setItem("token", message);
                    window.location.replace("http://localhost:3000/chat");
                    break;
    
                case "login":
                    window.location.replace("http://localhost:3000/chat");
                    break;
            
                default:
                    break;
            }
        }
    });

    return (
        <div class="container">
            <div class="main">
                <div class="input">
                    <div class="title">
                        <img src="./anti-rain.png" alt="anti-rain"></img>
                        <label>ANTI RAIN</label>
                    </div>

                    <div id="login">
                        <div class="email">
                            <label for="email">E-Mail</label>
                            <input type="email" name="email" id="loginEmail" autoComplete="off"></input>
                        </div>

                        <div class="password">
                            <label for="password" >Passord</label>
                            <input type="password" name="password" id="loginPassword" autoComplete="off"></input>
                        </div>

                        <div class="button">
                            <button onClick={login}>Log in</button>
                            <label> Want to <button class="show" onClick={show}>register</button> ?</label>
                        </div>
                    </div>

                    <div id="signup">
                        <div class="name">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="signupName" autoComplete="off"></input>
                        </div>

                        <div class="email">
                            <label for="email">E-Mail</label>
                            <input type="email" name="email" id="signupEmail" autoComplete="off"></input>
                        </div>

                        <div class="password">
                            <label for="password">Passord</label>
                            <input type="password" name="password" id="signupPassword" autoComplete="off"></input>
                        </div>

                        <div class="password">
                            <label for="password-confirm">Confirm passord</label>
                            <input type="password" name="password-confirm" id="signupPasswordConfirm" autoComplete="off"></input>
                        </div>

                        <div class="button">
                            <button onClick={signup}>Register</button>
                            <label> Want to <button  class="show" onClick={show}>log in</button> ?</label>
                        </div>
                    </div>
                </div>

                <div class="image">
                    <img src="./a10.png" alt="image"></img>
                </div>
            </div>
        </div>
    )
}

export default login;