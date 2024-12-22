import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout"
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Login = () => {
    
        const[email,setEmail]=useState("")
        const[password,setPassword]=useState("")

        const navigate=useNavigate()


        const handleLogin=async(e)=>{
            e.preventDefault();
            
            try{
    
                const res =await axios.post('http://localhost:8080/api/v1/auth/login',{email,password,})
                if(res && res.data.success){
                    toast.success(res.data &&res.data.message)
                    navigate('/')
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
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
      
    
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
    
<button type="submit" className="btn btn-primary">Login</button>
    </form>
    
          </div>
        </Layout>
  )
}

export default Login
