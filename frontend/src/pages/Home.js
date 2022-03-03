import React from "react";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div>
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
