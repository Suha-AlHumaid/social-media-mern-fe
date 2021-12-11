import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flexRow stk">
      <div className="fixedheader">
        <Link to="/home" className="logo">𝐼𝓃𝓈𝓉𝒶𝑔𝓇𝒶𝓂𝒾</Link>
      </div>
    </div>
  );
};

export default Header;
