import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/Adminmenu.jsx";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();

  // Check if the user is an admin
  useEffect(() => {
    if (!auth?.token) {
      toast.error("Please login to access this page");
      navigate('/login');
      return;
    }
    
    if (auth?.user?.role !== 1) {
      toast.error("Admin access required");
      navigate('/');
      return;
    }
  }, [auth, navigate]);

  // Fetch orders
  const getOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        "https://grocery-grove.onrender.com/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.error('Order fetch error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token && auth?.user?.role === 1) {
      getOrders();
    }
  }, [auth]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `https://grocery-grove.onrender.com/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      await getOrders();
      toast.success("Order status updated");
    } catch (error) {
      console.error('Status update error:', error);
      toast.error("Failed to update order status");
    }
  };

  // Fixed the condition
  if (auth?.user?.role !== 1) {
    return null;
  }

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {loading ? (
            <div className="text-center">Loading orders...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : orders?.length === 0 ? (
            <div className="text-center">No orders found</div>
          ) : (
            orders.map((o, i) => (
              <div key={o._id} className="border shadow mb-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Products</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{o?.products?.map((p) => p.name).join(", ")}</td>
                      <td>{moment(o?.createdAt).format("MMM Do YY")}</td>
                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  <div className="row">
                    {o?.products?.map((p, index) => (
                      <div key={index} className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            width="100px"
                            height="100px"
                            className="card-img-top"
                          />
                        </div>
                        <div className="col-md-8">
                          <h6>Name: {p.name}</h6>
                          <p>Description: {p.description?.substring(0, 30)}</p>
                          <p>Price: ₹{p.price}</p>
                          <p>Quantity: {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;