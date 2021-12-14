import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import {TiDeleteOutline} from"react-icons/ti"
import "./style.css"
const Comment = ({elem, getPost,getAllComments,isPostPuplisher}) => {
  const [isPuplisher, setIsPuplisher]=useState(false)
  const [isAdmin, setIsAdmin]=useState(false)
    const state = useSelector((state) => {
        return {
          reducerLog: state.reducerLog,
        };
      });
      useEffect(() => {
        getPost();
      }, [elem]);



      const deleCommentAdmin=async(_id)=>{
 console.log(_id);
        try {
          const result = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/anyCommentOrpost`,
            {_id},
            {
              headers: {
                Authorization: `Bearer ${state.reducerLog.token}`,
              },
            }
          );
    
          // getPost()
          getAllComments()
   } catch (error) {
       console.log(error);
   }
    }
  // put/deleteCommentOfUserPost/:_id

  const deleteOthersComment = async (e) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/deleteCommentOfUserPost/${elem.post}`,
        { comment_id: elem._id},
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
  
      );
      console.log(result.data);
   
      getAllComments();

    } catch (error) {
      console.log(error.response);
    }
  };

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

    useEffect(() => {
      check();
    }, []);
    const check = () => {
      const storageUser = localStorage.getItem("user")
      const userStorage= JSON.parse(storageUser)
  
      console.log(userStorage);
      if (elem.puplisher._id == userStorage._id) {
        setIsPuplisher(true);
      }
  
      if (userStorage.role !== "61a744e5313b1e7127be4634") {
        setIsAdmin(true);
        console.log("admin");
      }
    };
    return (
        <div className="commentContainer">
           
            <h1 className="user">{elem.puplisher.userName}:</h1> <span className="comment">{elem.discription}</span>
            {isPuplisher? <TiDeleteOutline className="unlike" onClick={deleComment}/>:""}
            {isPostPuplisher? <TiDeleteOutline className="unlike" onClick={deleteOthersComment}/>:""}
            {isAdmin? <TiDeleteOutline className="like" onClick={()=>deleCommentAdmin(elem._id)}/>:""}
        </div>
    )
}

export default Comment
