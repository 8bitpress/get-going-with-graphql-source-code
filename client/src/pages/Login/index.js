import { useState } from "react";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

function Login() {
  const [isMember, setIsMember] = useState(true);

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow p-8 max-w-sm w-10/12">
        <h1 className="mb-4 text-2xl">Welcome to Bibliotech</h1>
        <form>
          <TextInput
            className="mb-4"
            hiddenLabel
            id="username"
            inputWidthClass="w-full"
            label="Username"
            placeholder="Your username"
            type="text"
          />
          {!isMember && (
            <>
              <TextInput
                className="mb-4"
                hiddenLabel
                id="email"
                inputWidthClass="w-full"
                label="Email"
                placeholder="Your email"
                type="email"
              />
              <TextInput
                className="mb-4"
                hiddenLabel
                id="name"
                inputWidthClass="w-full"
                label="Full Name"
                placeholder="Your full name"
                type="text"
              />
            </>
          )}
          <TextInput
            className="mb-8"
            hiddenLabel
            id="password"
            inputWidthClass="w-full"
            label="Password"
            placeholder="Your password"
            type="password"
          />
          <div className="flex items-center">
            <Button
              className="mr-2"
              text={isMember ? "Log In" : "Sign Up"}
              type="submit"
            />
            <p className="text-gray-400">
              {isMember ? "New here?" : "Already joined?"}
            </p>
            <button
              className="text-red-500 hover:text-red-700 ml-1 focus:outline-none hover:underline"
              onClick={event => {
                event.preventDefault();
                setIsMember(state => !state);
              }}
            >
              {isMember ? "Sign up." : "Log in."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
