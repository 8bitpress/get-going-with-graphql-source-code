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
      <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-lg px-8 py-8 w-full">
        <Link
          to="/"
          className="text-black hover:text-gray-800 hover:no-underline mr-4"
        >
          <h1>Bibliotech</h1>
        </Link>
        <div className="flex items-center sm:justify-end mt-2 sm:mt-0">
          {isAuthenticated() && (
            <>
              <Link to="/home">
                <span className="font-semibold mr-4 text-sm sm:text-base text-red-600">
                  My Library
                </span>
              </Link>
              <Link to="/book/new">
                <span className="font-semibold mr-4 text-sm sm:text-base text-red-600">
                  Add Book
                </span>
              </Link>
            </>
          )}
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
