import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? <Redirect to="/" /> : <Redirect to="/profile" />}
      <div className="home">
        <LeftNav />
        <div className="main">
          <div className="home-header">
            <NewPostForm />
          </div>
          <Thread />
        </div>
      </div>
    </div>
  );
};

export default Home;
