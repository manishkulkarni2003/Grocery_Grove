import React, { useState } from 'react'
import Layout from "./../../components/Layout/Layout"
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Register = () => {

    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [answer,setAnswer]=useState("")

    const navigate =useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{

            const res =await axios.post('https://grocery-grove.onrender.com/api/v1/auth/register',{name,email,password,phone,address,answer})
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
    <Layout title="Register-GroceryGrove" >
      <div className="form-container">
        
        <form onSubmit={handleSubmit}>
        <h1 className='text-center'>Register</h1>
  <div className="mb-3">
    <input type="text"
    value={name}
    onChange={(e)=>{
        setName(e.target.value)
    }}
     className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name'
     required  />
    
  </div>

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
    
    <input type="text"
    value={phone}
    onChange={(e)=>{
        setPhone(e.target.value)
    }}
    className="form-control" id="exampleInputEmail1" placeholder='Enter a Phone' 
    required />
    
  </div>

  <div className="mb-3">
   
    <input type="text" 
    value={address}
    onChange={(e)=>{
        setAddress(e.target.value)
    }}
    className="form-control" id="exampleInputEmail1" placeholder='Enter Your Address' 
    required />
    
  </div>
  <div className="mb-3">
   
    <input type="text" 
    value={answer}
    onChange={(e)=>{
        setAnswer(e.target.value)
    }}
    className="form-control" id="exampleInputEmail1" placeholder='Whats?Your Favourite Color' 
    required />
    
  </div>

<button type="submit" className="btn btn-primary">Submit</button>
</form>

      </div>
    </Layout>
  )
}

export default Register
