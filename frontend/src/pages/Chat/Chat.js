import * as React from "react";
import './Chat.css';
import io from "socket.io-client";

const chat = () => {
    const socket = new io("http://localhost:5000");
    socket.onopen(() => {
        socket.emit('example_message', 'demo');
    });

    const sendSocketIO= () => {
        socket.emit('example_message', 'demo');
    }


    return (
        <div>
            <div className="navBar">
                <div class="server">
                    <div>
                        <div class="image">
                            <img src="https://via.placeholder.com/150C/O" alt="placeholder"/>
                        </div>

                        <div class="name">
                            <label>CHAT Server NAME</label>
                        </div>
                        <div class="drope">
                            <label>V</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body">
                <div class="serverList">
                    <div class="chatList">

                    </div>
                    <div class="user">
                        <div class="image">
                            <img src="https://via.placeholder.com/150C/O" alt="placeholder"/>
                        </div>
                        <div class="name">
                            <label>eto.senpai</label>
                        </div>
                    </div>
                </div>

                <div class="chat">
                    <div id="message">
                        <div class="contain">

                            <div class="msg">
                                <div class="image">
                                    <img src="https://via.placeholder.com/150C/O" alt="placeholder"/>
                                </div>
                                <div class="data">
                                    <div class="info">
                                        <label class="username">eto.senpai</label> <label class="dateTime">12/02/2021 17:03</label>
                                    </div>
                                    <div class="message">
                                        <label>salut</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <from class="input">
                        <input type="text" placeholder="Type your message"/>
                        <button onClick={sendSocketIO}>send</button>
                    </from>

                </div>

                <div class="userList">
                    <div>
                        <div class="image">
                            <img src="https://via.placeholder.com/150C/O" alt="placeholder"/>

                        </div>
                        <div class="name">
                            <label>eto.senpai</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default chat;
