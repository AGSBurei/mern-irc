import { Switch, Route, BrowserRouter } from "react-router-dom";
import Chat from "./pages/Chat/Chat.js";
import login from "./pages/login/login.js";
import signup from "./pages/signup/signup.js";
import * as React from "react";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/login" component={login} />
        <Route path="/signup" component={signup} />
      </Switch>
    </BrowserRouter>
  );
}
