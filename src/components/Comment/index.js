import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import {TiDeleteOutline} from"react-icons/ti"
import "./style.css"
const Comment = ({elem, getPost,getAllComments}) => {
    const state = useSelector((state) => {
        return {
          reducerLog: state.reducerLog,
        };
      });
      useEffect(() => {
        getPost();
      }, []);
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
    
          getPost()
          getAllComments()
   } catch (error) {
       console.log(error);
   }
     
    }
    return (
        <div className="commentContainer">
           
            <h1 className="user">{elem.puplisher.userName}:</h1> <span className="comment">{elem.discription}</span>
            <TiDeleteOutline className="unlike" onClick={deleComment}/>
            
        </div>
    )
}

export default Comment
