import { Switch } from "react-router";

import Book from "../pages/Book";
import Index from "../pages/Index";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import Search from "../pages/Search";

function Routes() {
  return (
    <Switch>
      <PublicRoute exact path="/" component={Index} />
      <PrivateRoute exact path="/home" component={Home} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/book/:id" component={Book} />
      <PublicRoute exact path="/search" component={Search} />
    </Switch>
  );
}

export default Routes;
