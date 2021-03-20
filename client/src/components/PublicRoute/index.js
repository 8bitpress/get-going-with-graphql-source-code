import { Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

function PublicRoute({ component: Component, ...rest }) {
  const { checkingSession } = useAuth();
  const { pathname } = useLocation();

  const renderRoute = props => {
    if (checkingSession) {
      return (
        <div className="flex h-screen">
          <Loader centered />
        </div>
      );
    }

    return <Component {...props} />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Route {...rest} render={renderRoute} />;
}

export default PublicRoute;
