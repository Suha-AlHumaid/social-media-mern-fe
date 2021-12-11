import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { MdExplore, MdHome, MdAddBox , MdPerson} from "react-icons/md";
const Menu = () => {
  return (
    <div className="flexRow stk">
      <div className="fixedbottom">
        <div className="divIcon">
          <Link to="/home">Home</Link> < MdHome  className="icon" />
          </div>

          <div className="divIcon">
          <Link to="/">Explore</Link> <MdExplore className="icon" />
        </div>

        <div className="divIcon">
          <Link to="/add">Add</Link>< MdAddBox className="icon" />
          </div>
          <div className="divIcon"> 
          <Link to="/profile">Profile</Link>< MdPerson className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
