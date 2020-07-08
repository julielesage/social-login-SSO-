import React from "react";
//import 'style.css';

const Header = ({ username }) => {
  return (
    <>
      <img alt="logo Groupe Rocher" src="" />
      <h2>
        {username
          ? `Le Header dit : Bonjour ${username}`
          : `Le header dit CONNECTEZ VOUS`}
      </h2>
    </>
  );
};

export default Header;
