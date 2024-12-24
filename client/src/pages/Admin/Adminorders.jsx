import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const {Option} =Select;



const Adminorders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange=async(orderId,value)=>{
    try{
        const {data}=await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`,{status:value})
        getOrders();

    }catch(err){
        console.log(err)

    }
  }

  
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
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
                            <Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status} >
                            {status.map((s,i)=>(
                                <Option key={i} value={s}>
                                    
                                </Option>
                            ))}
                            </Select>
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
    </Layout>
  );
};

export default Adminorders;