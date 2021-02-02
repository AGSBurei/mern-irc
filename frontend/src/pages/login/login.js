import * as React from "react";
import './login.css';

const login = () => {
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
                            <input type="email" name="email" autoComplete="off"></input>
                        </div>

                        <div class="password">
                            <label for="password" >Passord</label>
                            <input type="password" name="password" autoComplete="off"></input>
                        </div>

                        <div class="button">
                            <button>Log in</button>
                            <label> Want to <button class="show">register</button> ?</label>
                        </div>
                    </div>

                    <div id="signup">
                        <div class="name">
                            <label for="name">Name</label>
                            <input type="text" name="name" autoComplete="off"></input>
                        </div>

                        <div class="email">
                            <label for="email">E-Mail</label>
                            <input type="email" name="email" autoComplete="off"></input>
                        </div>

                        <div class="password">
                            <label for="password">Passord</label>
                            <input type="password" name="password" autoComplete="off"></input>
                        </div>

                        <div class="password">
                            <label for="password-confirm">Confirm passord</label>
                            <input type="password" name="password-confirm" autoComplete="off"></input>
                        </div>

                        <div class="button">
                            <button>Register</button>
                            <label> Want to <button  class="show">log in</button> ?</label>
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