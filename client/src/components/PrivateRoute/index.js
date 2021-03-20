import { Redirect, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

function PrivateRoute({ component: Component, ...rest }) {
  const { checkingSession, isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const renderRoute = props => {
    if (checkingSession) {
      return (
        <div className="flex h-screen">
          <Loader centered />
        </div>
      );
    } else if (isAuthenticated()) {
      return <Component {...props} />;
    }

    return <Redirect to="/login" />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Route {...rest} render={renderRoute} />;
}

export default PrivateRoute;
