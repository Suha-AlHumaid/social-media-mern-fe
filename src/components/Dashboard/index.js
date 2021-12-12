import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {TiDeleteOutline} from"react-icons/ti"
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const state = useSelector((state) => {
      return {
        reducerLog: state.reducerLog,
      };
    });
    console.log(state.reducerLog.token);
  
    useEffect(() => {
      getAllUsers();
    }, []);
  
    const getAllUsers = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/all`,
          {
            headers: {
              Authorization: `Bearer ${state.reducerLog.token}`,
            },
          }
        );
       if(result.status){
        setUsers(result.data);
        console.log(result.data);
       }
    
      } catch (error) {
        console.log(error);
      }
    };

    const deleteUser=async(id)=>{
 console.log(id);
        try {
          const result = await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${state.reducerLog.token}`,
              },
            }
          );
    
      getAllUsers()
   } catch (error) {
       console.log(error);
   }
     
    }
    return (
        <div className="container">
            {/* get users 
            delete user 
            delete post or comment
            logout */}
            <h1 onClick={  getAllUsers}>All Users</h1>
            <div className="grid">
            {users && users.map((elem)=>(
           
                <div  className="item">
                    <img id="usersAvater" src={elem.avatar} alt={elem._id}/>
                   <p> {elem.userName} <TiDeleteOutline onClick={()=>{deleteUser(elem._id)}}/></p>
                </div>

     
            ))}
            </div>

        </div>
    )
}

export default Dashboard
