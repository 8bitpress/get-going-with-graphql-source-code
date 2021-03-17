import { Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";

import { Login as LoginMutation } from "../../graphql/mutations";
import { SignUp } from "../../graphql/mutations";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

function Login() {
  const [isMember, setIsMember] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { isAuthenticated, persistSessionData } = useAuth();
  const history = useHistory();

  const onCompleted = data => {
    const { token, viewer } = Object.entries(data)[0][1];
    persistSessionData({ token, viewer });
    history.push("/home");
  };

  const [login, { error, loading }] = useMutation(LoginMutation, {
    onCompleted
  });
  const [signUp] = useMutation(SignUp, { onCompleted });

  return isAuthenticated() ? (
    <Redirect to="/home" />
  ) : (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow p-8 max-w-sm w-10/12">
        <h1 className="mb-4 text-2xl">Welcome to Bibliotech</h1>
        <form
          onSubmit={async event => {
            event.preventDefault();

            if (isMember) {
              await login({ variables: { password, username } }).catch(err => {
                console.error(err);
              });
            } else {
              await signUp({
                variables: { input: { email, name, password, username } }
              }).catch(err => {
                console.error(err);
              });
            }
          }}
        >
          <TextInput
            className="mb-4"
            hiddenLabel
            id="username"
            inputWidthClass="w-full"
            label="Username"
            onChange={event => {
              setUsername(event.target.value);
            }}
            placeholder="Your username"
            type="text"
            value={username}
          />
          {!isMember && (
            <>
              <TextInput
                className="mb-4"
                hiddenLabel
                id="email"
                inputWidthClass="w-full"
                label="Email"
                onChange={event => {
                  setEmail(event.target.value);
                }}
                placeholder="Your email"
                type="email"
                value={email}
              />
              <TextInput
                className="mb-4"
                hiddenLabel
                id="name"
                inputWidthClass="w-full"
                label="Full Name"
                onChange={event => {
                  setName(event.target.value);
                }}
                placeholder="Your full name"
                type="text"
                value={name}
              />
            </>
          )}
          <TextInput
            className="mb-8"
            hiddenLabel
            id="password"
            inputWidthClass="w-full"
            label="Password"
            onChange={event => {
              setPassword(event.target.value);
            }}
            placeholder="Your password"
            type="password"
            value={password}
          />
          <div className="flex items-center">
            <Button
              className="mr-2"
              disabled={loading}
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
          {error && (
            <p className="mt-4 text-red-500 text-sm">{error.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
