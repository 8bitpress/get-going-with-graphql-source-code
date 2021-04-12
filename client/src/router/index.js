import { createBrowserHistory } from "history";
import { Switch } from "react-router";

import Book from "../pages/Book";
import Index from "../pages/Index";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewBook from "../pages/NewBook";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import ReviewBook from "../pages/ReviewBook";
import Search from "../pages/Search";

export const history = createBrowserHistory();

export function Routes() {
  return (
    <Switch>
      <PublicRoute exact path="/" component={Index} />
      <PrivateRoute exact path="/home" component={Home} />
      <PublicRoute exact path="/login" component={Login} />
      <PrivateRoute exact path="/book/new" component={NewBook} />
      <PublicRoute exact path="/book/:id" component={Book} />
      <PrivateRoute
        exact
        path="/book/:bookId/review/new"
        component={ReviewBook}
      />
      <PrivateRoute
        exact
        path="/book/:bookId/review/:reviewId"
        component={ReviewBook}
      />
      <PublicRoute exact path="/search" component={Search} />
    </Switch>
  );
}
