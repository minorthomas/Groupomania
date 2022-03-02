import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" exact activeClassName="active-left-nav">
            <img src="./img/icons/home.svg" alt="Home" />
          </NavLink>
          <br />
          <NavLink to="/trending" exact activeClassName="active-left-nav">
            <img src="./img/icons/rocket.svg" alt="Trending" />
          </NavLink>
          <br />
          <NavLink to="/profile" exact activeClassName="active-left-nav">
            <img src="./img/icons/user.svg" alt="Profil" />
          </NavLink>
          <br />
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
