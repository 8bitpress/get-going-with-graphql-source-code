import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";

import { AuthProvider } from "./context/AuthContext";
import client from "./graphql/apollo";
import Routes from "./routes";

import "./index.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
