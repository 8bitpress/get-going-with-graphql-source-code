import { ApolloProvider } from "@apollo/client";
import { Router } from "react-router-dom";
import ReactDOM from "react-dom";

import { AuthProvider } from "./context/AuthContext";
import client from "./graphql/apollo";
import Routes, { history } from "./routes";

import "./index.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
