import { Link, useHistory } from "react-router-dom";

import Button from "../Button";

function NavBar() {
  const history = useHistory();

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
              history.push("/login");
            }}
            text="Log In"
          />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
