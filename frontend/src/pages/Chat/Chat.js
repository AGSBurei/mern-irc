import * as React from "react";
import io from "socket.io-client";
import swal from 'sweetalert';

const chat = () => {
    require('./style.css');

    // user data
    let _idUser;
    let name;
    let ListOfServer;

    // server
    let _idServer;

    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const socket = new io("http://localhost:5000");

    const session = () => {
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }

    const serverList = () => {
        socket.emit('serverList', _idUser, result);
    }

    const changeServer = () => {
        document.getElementById("userList").innerHTML = '';
        document.getElementById("msg").innerHTML = '';

        socket.emit('serverUser', _idServer, result);

        socket.emit('join', _idServer);
    }

    window.addEventListener("click", (e) => {
        if (e.target.className == "serverName") {
            _idServer = e.target.id;
            changeServer();
        }
    });

    socket.on("message", (server, message, name) => {
        if (server == _idServer) {
            let messageList = document.createElement("li");
            let div1 = document.createElement("div");
            let img = document.createElement("img");
            let div2 = document.createElement("div");
            let div3 = document.createElement("div");
            let div4 = document.createElement("div");
            let label1 = document.createElement("label");
            let label3 = document.createElement("label");

            div1.className = "image";
            img.src = "https://via.placeholder.com/150C/O";
            img.alt = "placeholder";

            div2.className = "data";
            div3.className = "info";
            div4.className = "message";
            label1.className = "username";
            label1.innerText = name;
            label3.innerText = message;
            
            div1.appendChild(img);
            div3.appendChild(label1);
            div4.appendChild(label3);
            div2.appendChild(div3);
            div2.appendChild(div4);
            
            messageList.appendChild(div1);
            messageList.appendChild(div2);

            console.log(message)

            document.getElementById("msg").appendChild(messageList);            
        }
    })

    const sendMessage = () => {
        socket.emit("message", _idServer, document.getElementById("sendMessage").value, _idUser);
    }

    session();

    if (localStorage.getItem("token") != null || localStorage.getItem("token") != "") {
        socket.emit('token', localStorage.getItem("token"), result);
    } else {
        window.location.replace("http://localhost:3000/");
    }

    socket.on(result, (request, message) => {
        if (message == "removeToken") {
            localStorage.removeItem("token");
            window.location.replace("http://localhost:3000/");
        } else {
            switch (request) {
                case "error", "success":
                    swal(request, message, request);
                    break;

                case "login":
                    _idUser = message._id;
                    name = message.name;
                    ListOfServer = message.ListOfServer;

                    serverList();

                    document.getElementById('name').innerHTML = "<label>" + name + "</label>";
                    break;

                case "serverList":
                    let listServer = document.createElement("li");
                    let button = document.createElement("button");

                    button.id = message._idServer;
                    button.innerText = message.name;
                    button.className = "serverName";

                    listServer.appendChild(button)

                    document.getElementById("serverList").appendChild(listServer);
                    break;

                case "serverUser":
                    let userList = document.createElement("li");

                    let div1 = document.createElement("div");
                    let div2 = document.createElement("div");

                    let img = document.createElement("img");
                    let label = document.createElement("label");

                    div1.className = "image";
                    div2.className = "name";

                    img.src = "https://via.placeholder.com/150C/O";
                    img.alt = "placeholder";
                    label.innerText = message;

                    div1.appendChild(img);
                    div2.appendChild(label);

                    userList.appendChild(div1);
                    userList.appendChild(div2);

                    document.getElementById("userList").appendChild(userList);
                    break;

                default:
                    break;
            }
        }
    });



    // socket.emit('server', id, "World");


    return (
        <div>
            <div class="body">
                <div class="serverList">
                    <div class="chatList">
                        <ul id="serverList">

                        </ul>
                    </div>
                    <div class="user">
                        <div class="image">
                            <img src="https://via.placeholder.com/150C/O" alt="placeholder" />
                        </div>
                        <div id="name" class="name">
                            
                        </div>
                    </div>
                </div>

                <div class="chat">
                    <div id="message">
                        <div class="contain">
                            <div class="msg">
                                <ul id="msg">
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <from class="input">
                        <input type="text" placeholder="Type your message" id="sendMessage" />
                        <button onClick={sendMessage}>send</button>
                    </from>

                </div>

                <div class="userList">
                    <div>
                        <ul id="userList">

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default chat;
