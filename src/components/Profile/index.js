import React,{useState,useEffect} from "react";
import { logOut } from "../../Reducers/login";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./style.css"
import {MdLogout,MdEdit} from "react-icons/md"

const Profile = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const[user , setUser]=useState(null)

  const logout = () => {
    dispatch(logOut({ user: null, token: "" }));
    navigate("/")
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


const state = useSelector((state) => {
  return {
    reducerLog: state.reducerLog,
  };
});



  return (
    <div className="container center">
     
{user ? 
 <div className="profile"> 

   <img id="avatar" src={user.avatar} alt={user.userName}/>
   <h1 className="h1"> UserName: </h1>
   <h1 className="h2">{user.userName}</h1>
   <h1 className="h1"> Email: </h1>
   <h1 className="h2">{user.email}</h1>
   <MdLogout
        className="icon"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      />

    </div>:    <MdLogout
        className="icon"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      />}
    

      
    </div>
  );
};

export default Profile;
