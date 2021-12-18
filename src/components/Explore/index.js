import React, { useEffect } from "react";
import Post from "../Post";
import "./style.css";
const Explore = ({ posts, getAll }) => {
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="container">
      <div className="reverseCol full">
        {posts && posts.length ? (
          posts.map((elem) => (
            <Post getAll={getAll} key={elem._id} elem={elem} />
          ))
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif"
            id="laoding"
          />
        )}
      </div>
    </div>
  );
};

export default Explore;
