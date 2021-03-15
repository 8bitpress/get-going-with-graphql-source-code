import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Logout } from "../../graphql/mutations";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";

function NavBar() {
  const { clearSessionData, isAuthenticated } = useAuth();
  const history = useHistory();

  const [logout] = useMutation(Logout, {
    onCompleted: () => {
      clearSessionData();
      history.push("/login");
    }
  });

  return (
    <header className="bg-white border-b border-gray-200 border-solid">
      <div className="flex items-center justify-between mx-auto max-w-screen-lg px-8 py-8 w-full">
        <Link
          to="/"
          className="text-black hover:text-gray-800 hover:no-underline"
        >
          <h1>Bibliotech</h1>
        </Link>
        <div>
          <Button
            onClick={event => {
              event.preventDefault();

              if (isAuthenticated()) {
                logout();
              } else {
                history.push("/login");
              }
            }}
            text={isAuthenticated() ? "Log out" : "Log In"}
          />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
