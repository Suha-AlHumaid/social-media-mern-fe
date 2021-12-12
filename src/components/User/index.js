import React from 'react'
import { useParams } from 'react-router'
const User = () => {
const {id}= useParams()
console.log(id);
    return (
        <div>
            
        </div>
    )
}

export default User
