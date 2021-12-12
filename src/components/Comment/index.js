import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import "./style.css"
const Comment = ({elem, getAll}) => {
    const state = useSelector((state) => {
        return {
          reducerLog: state.reducerLog,
        };
      });
    const deleComment=async()=>{
 
        try {
          const result = await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/comment/${elem._id}`,
            {
              headers: {
                Authorization: `Bearer ${state.reducerLog.token}`,
              },
            }
          );
    
    getAll()
       
   } catch (error) {
       console.log(error);
   }
     
    }
    return (
        <div className="commentContainer">
           
            <h1 className="user">{elem.puplisher.userName}:</h1> <span className="comment">{elem.discription}</span>
            <p onClick={deleComment}>Dele</p>
            
        </div>
    )
}

export default Comment
