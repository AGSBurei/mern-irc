import { Switch, Route, BrowserRouter } from "react-router-dom";
import Chat from "./pages/Chat/Chat.js";
import login from "./pages/login/login.js";
import * as React from "react";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/login" component={login} />
      </Switch>
    </BrowserRouter>
  );
}
