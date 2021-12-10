import React from 'react'
import { logOut } from "../../Reducers/login";
import { useSelector,useDispatch } from "react-redux";
const Profile = () => {

    const dispatch = useDispatch();

    const logout = () => {
      
        dispatch(logOut({ user: null, token: "" }));
      };


    return (
        <div>

            <p>profile</p>

            <span
        className="icon"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        (logout)
      </span>

        </div>
    )
}

export default Profile
