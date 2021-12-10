
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Post from "../Post";
const Explore = ({posts}) => {


 

  return (<div>

<h1>Explore Posts:</h1>
{posts&& posts.length?posts.map(elem=>
<Post  key ={elem._id} elem={elem}/>
) :"cc"
}
  </div>
  )
};

export default Explore;
