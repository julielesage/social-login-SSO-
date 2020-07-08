import React, { useState } from "react";
import Cookies from "js-cookie";

import FacebookLogin from "react-facebook-login"; // found 4000 los severity !!

import "./App.css";
import Header from "./components/Header.js";
import LocalSignIn from "./components/LocalSignIn";
import LocalSignUp from "./components/LocalSignUp";

function App() {
  const [username, setUsername] = useState(Cookies.get("username") || "");
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [email, setEmail] = useState("");

  const onLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    Cookies.set("token", token, { expires: 100 });
    Cookies.set("username", username, { expires: 100 });
  };

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    setToken(null);
    setUsername(null);
  };

  const FBresponse = (response) => {
    console.log(response.accessToken, response.name);
    onLogin(response.accessToken, response.name);
  };

  return (
    <div>
      <div className="wrapper">
        <Header username={username} />
        {token ? (
          <div className="parti centered aligned column">
            <p>C'est parti l'appli, {username} !</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                logOut();
              }}
            >
              SE DECONNECTER
            </button>
          </div>
        ) : (
          <div className="row centered space-around">
            <section className="centered column">
              <h2>SIGN UP</h2>
              <FacebookLogin
                appId="739667456811201"
                autoload={true}
                fields="name"
                onClick={() => {}}
                callback={FBresponse}
                // render={(renderProps) => (
                //   <GoogleLoginButton
                //     onClick={renderProps.onClick}
                //     disabled={renderProps.disabled}
                //   />
                // )}
                // onSuccess={FBresponse}
                // onFailure={FBresponse}
                // cookiePolicy={"single_host_origin"}
              />
              ,
              {/* <FacebookLoginButton onClick={() => startAuth(facebook, url)} />
              <GoogleLoginButton onClick={() => startAuth(google, url)} /> */}
              <LocalSignUp
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                onLogin={onLogin}
              />
            </section>
            <LocalSignIn onLogin={onLogin} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
