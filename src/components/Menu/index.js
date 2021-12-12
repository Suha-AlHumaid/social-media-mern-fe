import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { MdExplore, MdHome, MdAddBox , MdPerson,MdAdminPanelSettings} from "react-icons/md";

const Menu = (role) => {
  return (
    <div className="flexRow stk">
      <div className="fixedbottom">
        <div>
          <Link className="divIcon"to="/home">Home< MdHome  className="icon" /></Link> 
          </div>

          <div >
          <Link className="divIcon" to="/">Explore<MdExplore className="icon" /></Link> 
        </div>

        <div >
          <Link className="divIcon" to="/add">New< MdAddBox className="icon" /></Link>
          </div>
          <div > 
          <Link className="divIcon" to="/profile">Profile< MdPerson className="icon" /></Link>
        </div>
        {role !== "61a744e5313b1e7127be4634"? <div > 
          <Link className="divIcon" to="/dashboard">Dashboard< MdAdminPanelSettings className="icon" /></Link>
        </div>:""}
      </div>
    </div>
  );
};

export default Menu;
