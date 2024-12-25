import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout"
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";


const Forgotpassword = () => {
    const[email,setEmail]=useState("")
    const[newPassword,setNewPassword]=useState("")
    const[answer,setAnswer]=useState("")
    

    const navigate=useNavigate();
    


    const handlePassword=async(e)=>{
        e.preventDefault();
        
        try{

            const res =await axios.post('https://grocery-grove.onrender.com/api/v1/auth/forgot-password',{email,newPassword,answer})
            if(res && res.data.success){
                toast.success(res.data &&res.data.message)
                
                
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error("SomeThing Went Wrong")
        }

}


  return (
    <Layout title="Forgot-Password">
      <div className="form-container">
            
            <form onSubmit={handlePassword}>
            <h1 className='text-center'>Reset-Password</h1>
    
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
        
        <input type="text"
        value={answer} 
        onChange={(e)=>{
            setAnswer(e.target.value)
        }}
        className="form-control" id="exampleInputEmail1" placeholder='Whats?Your Favourite Color'
        required  />
        
      </div>
    
      <div className="mb-3">
        
        <input type="password"
        value={newPassword}
        onChange={(e)=>{
            setNewPassword(e.target.value)
        }}
        className="form-control" id="exampleInputPassword1"placeholder='Enter a Password'
        required />
      </div>

      

<button type="submit" className="btn btn-primary center">Reset</button>
    </form>
    
          </div>
    </Layout>
  )
}

export default Forgotpassword
