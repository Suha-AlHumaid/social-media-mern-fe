import React from 'react'
import Comments  from "../comments"
const Post = ({elem}) => {

    return (
        <div>
           <h3>{elem.discription}</h3>
           comments: <Comments post={elem}/>
        </div>
    )
}

export default Post
