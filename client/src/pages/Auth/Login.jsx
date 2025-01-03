import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout"
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate,useLocation } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
    
        const[email,setEmail]=useState("")
        const[password,setPassword]=useState("")
        const [auth,setAuth]=useAuth()

        const navigate=useNavigate();
        const location =useLocation();


        const handleLogin=async(e)=>{
            e.preventDefault();
            
            try{
    
                const res =await axios.post('https://grocery-grove.onrender.com/api/v1/auth/login',{email,password,})
                if(res && res.data.success){
                    toast.success(res.data &&res.data.message)
                    setAuth({...auth,user:res.data.user,token:res.data.token})
                    localStorage.setItem('auth',JSON.stringify(res.data))
                    navigate(location.state||'/')
                }else{
                    toast.error(res.data.message)
                }
            }catch(err){
                console.log(err)
                toast.error("SomeThing Went Wrong")
            }
    
    }
  return (
    <Layout title="Login-GroceryGrove" >
          <div className="form-container">
            
            <form onSubmit={handleLogin}>
            <h1 className='text-center'>Login</h1>
    
      <div className="mb-3">
        
        <input type="email"
        value={email} 
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email'
        required  />
        
      </div>
    
      <div className="mb-3">
        
        <input type="password"
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        className="form-control" id="exampleInputPassword1"placeholder='Enter a Password'
        required />
      </div>

      <div className="mb-3">
      <button type="submit" className="btn btn-primary" onClick={()=>{
        navigate('/forgot-password')
      }}>Forgot Password</button>
      </div>

<button type="submit" className="btn btn-primary">Login</button>
    </form>
    
          </div>
        </Layout>
  )
}

export default Login
