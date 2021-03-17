import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

function PrivateRoute({ component: Component, ...rest }) {
  const { checkingSession, isAuthenticated } = useAuth();

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

  return <Route {...rest} render={renderRoute} />;
}

export default PrivateRoute;
