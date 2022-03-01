import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="Logo" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
