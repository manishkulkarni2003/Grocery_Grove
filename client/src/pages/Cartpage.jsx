import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'

import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";

import axios from 'axios'
import toast from 'react-hot-toast'
import "../styles/CartpageStyles.css"


const Cartpage = () => {
    const navigate=useNavigate();

    const [clientToken,setClientToken]=useState("");

    const [instance,setInstance]=useState("")

    const[loading,setLoading]=useState(false)


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

    //get payment gateway token 

    const getToken=async()=>{
        try{    

        const {data}=await axios.get('https://grocery-grove.onrender.com/api/v1/product/braintree/token');

        setClientToken(data?.clientToken)    


        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getToken();
    },[auth?.token])


    //handle payment
    const handlePayment =async()=>{
        try{
            setLoading(true)
            const {nonce}=await instance.requestPaymentMethod();

            const {data}=await axios.post('https://grocery-grove.onrender.com/api/v1/product/braintree/payment',{
                nonce,cart
            })

            setLoading(false)
            localStorage.removeItem('cart');
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success("Payment Completed Successfully")


        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }




    return (
        <Layout>
            <div className="cart-container">
                <div className="container">
                    <div className="cart-header">
                        <h1 className="cart-welcome">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="cart-status">
                            {cart?.length 
                                ? `You have ${cart?.length} items ${auth?.token ? "" : "- Please login to checkout"}`
                                : "Your Cart is Empty"
                            }
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-7">
                            <div className="cart-items-container">
                                {cart?.map(p => (
                                    <div className="cart-item" key={p._id}>
                                        <img 
                                            className="cart-item-image" 
                                            src={p.image} 
                                            alt={p.name}
                                        />
                                        <div className="cart-item-details">
                                            <h6 className="cart-item-name">{p.name}</h6>
                                            <p className="cart-item-description">
                                                {p.description.substring(0, 30)}...
                                            </p>
                                            <p className="cart-item-price">₹{p.price}</p>
                                            <p className="cart-item-quantity">
                                                Quantity: {p.quantity}
                                            </p>
                                            <button 
                                                className="remove-btn"
                                                onClick={() => removeCartItem(p._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="cart-summary">
                                <h4 className="summary-header">Cart Summary</h4>
                                <h6 className="summary-total">Total: {totalPrice()}</h6>

                                {auth?.user?.address ? (
                                    <div className="address-section">
                                        <h4 className="address-title">Delivery Address</h4>
                                        <p className="address-text">{auth?.user?.address}</p>
                                        <button 
                                            className="update-address-btn"
                                            onClick={() => navigate('/dashboard/user/profile')}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                ) : (
                                    <div className="address-section">
                                        {auth?.token ? (
                                            <button 
                                                className="update-address-btn"
                                                onClick={() => navigate('/dashboard/user/profile')}
                                            >
                                                Update Address
                                            </button>
                                        ) : (
                                            <button
                                                className="login-btn"
                                                onClick={() => navigate('/login', {
                                                    state: "/cart"
                                                })}
                                            >
                                                Please Login to Checkout
                                            </button>
                                        )}
                                    </div>
                                )}

                                {!clientToken || !cart?.length ? null : (
                                    <div className="payment-container">
                                        <DropIn
                                            options={{ 
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={instance => setInstance(instance)}
                                        />
                                        <button 
                                            className="payment-btn"
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing..." : "Make Payment"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Cartpage
