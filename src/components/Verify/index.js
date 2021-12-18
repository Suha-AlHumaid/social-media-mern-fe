import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
const Verify = () => {
  const { token2 } = useParams();
  const [message, setMessage] = useState("null");
  const navigate = useNavigate();

  useEffect(() => {
    verify();
  });

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
      <div className="form">
      <h1 className="headingWhite">Thank you for Verfy your account . Please</h1>
      <Link className="link" to="/">
       Log in 
      </Link>
      </div>
    </div>
  );
};

export default Verify;
