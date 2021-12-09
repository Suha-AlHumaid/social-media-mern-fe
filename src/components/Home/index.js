import React, { useState } from "react";
import Explore from "../Explore";
import Login from '../Login'
import Register from '../Register'
import { useSelector } from "react-redux";
import UserPosts from "../UserPosts";
const Home = () => {
    const [log , setLog]= useState(false)
    const state = useSelector((state) => {
        return {
          reducerLog: state.reducerLog,
        };
      });

    return (
        <div >
                {!state.reducerLog.token ? 
        <div className="home">
        {log?
        <>
        <Register /> 
        <p>you have an account? <span className="icon" onClick={(e)=>setLog(false)}>Loggin here</span> </p>
        </>:
        <>
        <Login />
        <p>you don't have an account? <span className="icon" onClick={(e)=>setLog(true)}>Register here</span> </p>
        </>
        }
       
      </div>
       : (
           <>
           <UserPosts/>
        <Explore/>
        </>
      )}
      </div>
    )
}

export default Home
