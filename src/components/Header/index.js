import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className="flexRow stk">
          <div className="fixed">
           <Link to="/home">Logo</Link>
           </div>
           

        </div>
    )
}

export default Header
