import { Switch, Route, BrowserRouter } from "react-router-dom";
import Chat from "./pages/Chat/Chat.js";
import login from "./pages/login/login.js";
import Active from "./pages/Active/Active.js"
import * as React from "react";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/Active/:id" component={Active} />
        <Route path="/" component={login} />
      </Switch>
    </BrowserRouter>
  );
}
