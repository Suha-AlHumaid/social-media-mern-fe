import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link, useNavigate ,useParams} from "react-router-dom";
const Verfy = () => {
    const {token2} = useParams()
    // /verify/:token

    const [discription, setDiscription] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("null");
  
    const navigate = useNavigate();
    useEffect(() => {
        verify()
      }, )

    const verify = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/verify/${token2}`
    
        );
        setMessage(result.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
        <div className="container">
             <h1 className="heading">Thank you for Verfy your account</h1>
             <h1 >{message? message:""} </h1>
           <Link to="/" > <p>Log in here</p></Link>
        </div>
    )
}

export default Verfy
