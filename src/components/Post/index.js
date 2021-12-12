import React,{useState,useEffect} from "react";
import "./style.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import{IoMdHeart} from "react-icons/io"
import {MdEdit} from "react-icons/md"


const Post = ({ elem,getAll }) => {
  const navigate = useNavigate();
  const [isLike, setlike]=useState(false)
  const [isPuplisher, setIsPuplisher]=useState(false)
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });
  useEffect(() => {
    check()
  }, [])

const check =()=>{
  if (elem.puplisher._id ==state.reducerLog.user._id){
    setIsPuplisher(true)
  }
 
}

  const toggle = async()=>{
   
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/like/${elem._id}`,
      {
        isLike
      },    {
        headers: {
          Authorization: `Bearer ${state.reducerLog.token}`,
        },
      }
    );
console.log(result.data);
console.log(result.status);
if(result.status === 200){
  setlike(!isLike)

}
 
    
  } catch (error) {
    console.log(error.response);
    if(error.response.status== 403) {
      setMessage("varified your email");
    }else {
      setMessage("wrong email or password");
    }
    // setMessage("faild");
  }
}
  return (
    <div className="full">
      <img
        src={elem.avatar}
        alt={elem._id}
        onClick={() => navigate(`/singlePost/${elem._id}`)}
      />
      <div className="txt">
      <h1 className="user">{elem.puplisher.userName}
       <IoMdHeart onClick={toggle} className={isLike?"like":"unlike"}/> 
        {isPuplisher? <MdEdit onClick={()=>
          
          navigate(`/editPost/${elem._id}`)} className="unlike"/>:""}</h1>
         <h3 >{elem.discription}</h3>
         <p className="date">{elem.Date}</p>
        
         </div>
    </div>
  );
};

export default Post;
