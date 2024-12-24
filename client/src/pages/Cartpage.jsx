import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'

import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'


const Cartpage = () => {
    const navigate=useNavigate();


    const[cart,setCart]=useCart();
    const[auth,setAuth]=useAuth();

    const totalPrice=()=>{
        try{
            let total =0;
            cart?.map((item)=>{
                total=total+item.price
            })
            return total.toLocaleString("en-IN",{
                style:"currency",
                currency:"INR"
            });
        }catch(err){
            console.log(err)
            return "₹0"
        }
    }


    const removeCartItem=(pid)=>{
        try{
            let myCart=[...cart];
            let index =myCart.findIndex(item=>item._id === pid);
            myCart.splice(index,1);
            setCart(myCart);
            localStorage.setItem('cart',JSON.stringify(myCart))


        }catch(err){
            console.log(err)
        }
    }


  return (
    <Layout>
      <div className="container">
        <div className="row">
           <div className="col-md-12">
            <h1 className='text-center bg-light p-2 mb-4'>
              {`Hello${auth?.token && auth?.user?.name}`}  
            </h1>
            <h4 className='text-center'>
            {
                cart?.length ?`You have ${cart?.length}Items ${auth?.token ?"":"Please Login to CheckOut"}`:(
                    "Your Cart is Empty"
                )
            }
            </h4>
           </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="row">
                    {
                        cart?.map(p=>(
                         <div className="row mb-2 p-3 card flex-row">
                            <div className="col-md-4">
                            <img className="card-img-top" src={p.image} alt={p.name} width="100px" height={"100px"} />
                            </div>
                            <div className="col-md-8">
                                <h6>Name:{p.name}</h6>
                                <p>Description:{p.description.substring(0,30)}</p>
                                <p>Price:₹{p.price}</p>
                                <p>Quantity:₹{p.quantity}</p>
                                <button className='btn btn-danger'
                                onClick={()=>removeCartItem(p._id)}
                                >Remove</button>
                            </div>
                         </div>   
                        ))
                    }
                </div>
            </div>
            <div className="col-md-6 text-center">
          <h4>
            Cart Summary
            <hr />
            <p>Total|checkOut|Payment</p>
            </h4>   
            <hr />
            <h6>Total:{totalPrice()}</h6>
            {auth?.user?.address?(
                <>
               <div className="mb-3">
                <h4>Current Address</h4>
                <p>{auth?.user?.address}</p>
                <button className='btn btn-outline-warning'
                onClick={()=>navigate('/dashboard/user/profile')}
                >
                    Update Address
                </button>

               </div> 
               </>
            ):(
                <>
            <div className="mb-3">
                {
                    auth?.token ?(
                    <button className='btn btn-outline-warning'
                    onClick={()=>navigate('/dashboard/user/profile')}
                    >
                     Update Address   
                    </button>    
                    ):(
                    <button
                    className='btn btn-outline-warning'
                    onClick={()=>navigate('/login',{
                        state:"/cart"
                    })}>
                        Please Login to Checkout
                    </button>

                    )
                }
            </div>
                </>
            )}

            </div>

        </div>
      </div>
    </Layout>
  )
}

export default Cartpage
