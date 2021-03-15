import { useApolloClient } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import { GetViewer } from "../../graphql/queries";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState();
  const [viewer, setViewer] = useState();
  const client = useApolloClient();

  const persistSessionData = authPayload => {
    if (authPayload.token && authPayload.viewer) {
      const decodedToken = jwtDecode(authPayload.token);
      const expiresAt = decodedToken.exp * 1000;
      localStorage.setItem("token_expires_at", expiresAt);
      setViewer(authPayload.viewer);
    }
  };

  const isAuthenticated = () => {
    const expiresAt = localStorage.getItem("token_expires_at");
    return expiresAt ? new Date().getTime() < expiresAt : false;
  };

  useEffect(() => {
    const authenticate = async () => {
      if (isAuthenticated() && !viewer) {
        try {
          const { data, error: viewerError, loading } = await client.query({
            query: GetViewer
          });

          if (!loading && viewerError) {
            setError(viewerError);
          } else if (!loading && data) {
            setViewer(data.viewer);
          }
        } catch (err) {
          setError(err);
        }
      }
      setCheckingSession(false);
    };
    authenticate();
  }, [client, viewer]);

  return (
    <AuthContext.Provider
      value={{
        checkingSession,
        error,
        isAuthenticated,
        persistSessionData,
        viewer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
