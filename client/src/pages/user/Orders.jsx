import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from "moment"




const Orders = () => {
  const [orders,setOrders]=useState([]);
  const [auth,setAuth]=useAuth();

  const getOrders =async()=>{
    try{

      const {data}=await axios.get('http://localhost:8080/api/v1/auth/orders')
      setOrders(data)



    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(auth?.token) getOrders();
  },[auth?.token]);


  return (
    <Layout title="Orders-Grocery Grove">
        <div className="container-fluid p-3 m-3">
            <div className="row">
            <div className="col-md-3">
            <Usermenu/>
            </div>
            <div className="col-md-9">
            <h1 className='text-center'>All Orders</h1>
            
          {orders.map((o,i)=>{
            return(
              <div className="border shadow">
                <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>
                    #
                    </th>
                    <th scope='col'>
                  Status
                    </th>
                    <th scope='col'>
                  Product
                    </th>
                    <th scope='col'>
                  Date
                    </th>
                    <th scope='col'>
                  Payment
                    </th>
                    <th scope='col'>
                  Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
              <tr>
                <td>
                  {i+1}
                </td>
                <td>
                  {o?.status}
                </td>
                <td>
                  {o?.products?.map(p=>p.name)}
                </td>
                <td>
                  {moment(o?.createdAt).fromNow()}
                </td>
                <td>
                  {o?.payment.success?"Success":"Failed"}
                </td>
                <td>
                  {o?.products?.length}
                </td>
              </tr>
                </tbody>
                </table>
                <div className="container">
                <div className="row">
                    {
                        o?.products?.map((p,i)=>(
                         <div className="row mb-2 p-3 card flex-row">
                            <div className="col-md-4">
                            <img className="card-img-top" src={p.image} alt={p.name} width="100px" height={"100px"} />
                            </div>
                            <div className="col-md-8">
                                <h6>Name:{p.name}</h6>
                                <p>Description:{p.description.substring(0,30)}</p>
                                <p>Price:₹{p.price}</p>
                                <p>Quantity:₹{p.quantity}</p>
                                
                            </div>
                         </div>   
                        ))
                    }
                </div>
                </div>
              </div>
            )
          })}

            </div>

            </div>
        </div>
      
    </Layout>
  )
}

export default Orders
