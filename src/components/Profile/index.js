import React,{useState,useEffect} from "react";
import { logOut } from "../../Reducers/login";
import { useSelector, useDispatch } from "react-redux";
import "./style.css"
import {MdLogout} from "react-icons/md"
const Profile = () => {
  const dispatch = useDispatch();
  const[user , setUser]=useState(null)

  const logout = () => {
    dispatch(logOut({ user: null, token: "" }));
  };
  // const state = useSelector((state) => {
  //   return {
  //     reducerLog: state.reducerLog,
  //   };
  // });
  // console.log(state.reducerLog.user);

useEffect(() => {
const storage= localStorage.getItem("user")
setUser(JSON.parse(storage))
console.log(JSON.parse(storage));
}, [])
  return (
    <div className="container">


      <MdLogout
        className="icon"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      />
     
{user ? 
 <div> 
   <img id="avatar" src={user.avatar} alt={user.userName}/>
   <h1> UserName: </h1>
   <h1>{user.userName}</h1>
   <h1> Email: </h1>
   <h1>{user.email}</h1>
   <h1>Reset Password </h1>

    </div>:""}
    

      
    </div>
  );
};

export default Profile;
