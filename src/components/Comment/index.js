import React from 'react'
import "./style.css"
const Comment = ({elem}) => {
    return (
        <div className="commentContainer">
            <h1 className="user">{elem.puplisher}:</h1> <span className="comment">{elem.discription}</span>
            
        </div>
    )
}

export default Comment
