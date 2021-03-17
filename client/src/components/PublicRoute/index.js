import { Route } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

function PublicRoute({ component: Component, ...rest }) {
  const { checkingSession } = useAuth();

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

  return <Route {...rest} render={renderRoute} />;
}

export default PublicRoute;
