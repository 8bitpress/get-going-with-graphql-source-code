import { Route, Switch } from "react-router";

import Index from "../pages/Index";
import Home from "../pages/Home";
import Login from "../pages/Login";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default Routes;
