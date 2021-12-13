import React from 'react'
import { Link } from 'react-router-dom'
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
    // const state = useSelector((state) => {
    //   return {
    //     reducerLog: state.reducerLog,
    //   };
    // });
  
    const verify = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/verify/${token2}`,
      
          {
            headers: {
              Authorization: `Bearer ${state.reducerLog.token}`,
            },
          }
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
