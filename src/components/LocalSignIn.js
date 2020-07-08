import React, { useState } from "react";
import axios from "axios";

const LocalSignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      // sending login to API
      const response = await axios.post(
        "https://leboncoin-de-julie.herokuapp.com/user/log_in",
        {
          email,
          password,
        }
      );

      if (response.data.token && response.data.account.username) {
        const token = response.data.token;
        const username = response.data.account.username;
        onLogin(token, username);
      } else {
        alert("token or username is missing");
      }
    } catch (e) {
      alert("Identifiants Incorrects");
    }
  };

  return (
    <div className="column">
      <h2>LOCAL SIGN IN</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p>Email</p>
        <input
          type="email"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <p>Paswword</p>
        <input
          type="password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <button type="submit">SE CONNECTER</button>
      </form>
    </div>
  );
};

export default LocalSignIn;
