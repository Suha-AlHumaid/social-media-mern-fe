import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <div className="flexRow stk">
        <Link to="/home">Home</Link>
        <Link to="/">Explore</Link>
        <Link to="/add">Add</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Menu;
