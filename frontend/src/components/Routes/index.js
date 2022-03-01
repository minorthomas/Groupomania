import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Trending from "../../pages/Trending";
import NavBar from "../NavBar";

const index = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/trending" exact component={Trending} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
