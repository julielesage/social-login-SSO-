import React, { useState } from "react";
import Axios from "axios";

const LocalSignUp = ({ email, username, onLogin, setUsername, setEmail }) => {
  const [password, setPassword] = useState("");
  const [passwordbis, setPasswordbis] = useState("");
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    // regex on username allow to avoid special characters, to count letters, allow from a to z and from 0 to 9, including - and _, for a total between 3 and 15 characters :
    const result = username.match(/^[a-zA-Z0-9_-]{3,15}$/);
    if (result === null) {
      setErrorMessage(
        "Pseudo non valide, n'utiliser que des lettres et des chiffres, entre 3 et 15 caractères"
      );
    } else if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordbis === ""
    )
      setErrorMessage("Merci de remplir tous les champs avec *");
    else if (password !== passwordbis) {
      setErrorMessage("Mot de passe non confirmé");
    } else if (!acceptConditions) {
      setErrorMessage("Veuillez accepter les conditions CGU/CGV");
    } else {
      try {
        //call post API
        console.log(username, email, password);
        const response = await Axios.post(
          "https://leboncoin-de-julie.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            password: password,
          }
        );
        console.log(response.data);
        //register token and username in App.js states and in Cookies
        onLogin(response.data.token, response.data.account.username);
      } catch (error) {
        alert("an error occured");
        console.log("error.message = ", error.message);
      }
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="centered">LOCAL SIGN UP</h2>
      <p>Username</p>
      <input
        type="text"
        value={username}
        className=""
        onChange={(e) => {
          e.preventDefault();
          setUsername(e.target.value);
        }}
      />

      <p>Email</p>
      <input
        type="email"
        value={email}
        className="signup-input fs-20"
        onChange={(event) => {
          event.preventDefault();
          setEmail(event.target.value);
        }}
      />
      <p>Password</p>
      <input
        type="password"
        className="signup-midinput fs-20"
        value={password}
        onChange={(event) => {
          event.preventDefault();
          setPassword(event.target.value);
        }}
      />
      <p>Confirm Password</p>
      <input
        type="password"
        className="signup-midinput fs-20"
        value={passwordbis}
        onChange={(event) => {
          event.preventDefault();
          setPasswordbis(event.target.value);
        }}
      />
      <div className="row aligned">
        <input
          name="CGV-CGU"
          className="signup-check"
          // pour insérer des cases à cocher:
          type="checkbox"
          value={acceptConditions}
          onChange={(event) => {
            event.preventDefault();
            setAcceptConditions(event.target.checked);
          }}
        />

        <label className="cgu-cgv">
          « J’accepte les{" "}
          <a href="http//:wwww.wisesound.fr" className="is-blue">
            <b>Conditions Générales de Vente</b>
          </a>{" "}
          et les{" "}
          <a href="http//:wwww.wisesound.fr" className="is-blue">
            <b>Conditions Générales d’Utilisation</b>
          </a>{" "}
          »
        </label>
      </div>
      <span className="error-message is-16">{errorMessage}</span>
      <button type="submit" className="btn-signup white fs-20 bold">
        S'enregistrer
      </button>
    </form>
  );
};

export default LocalSignUp;
