import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className="flexRow">
          
           <Link to="/profile">Profile</Link>
           <Link to="/home">Home</Link>
           <p>Search</p>
           <Link to="/">Explore</Link>

        </div>
    )
}

export default Header
