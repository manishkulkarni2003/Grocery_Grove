import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/Adminmenu.jsx";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const Adminorders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Get auth state from context
  const token = auth?.token; // Retrieve token from context
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin
  useEffect(() => {
    if (auth?.user?.role !== 1) {
      toast.error("You are not authorized to access this page.");
      window.location.href = "/"; // Redirect to homepage or any other page
    } else {
      setIsAdmin(true); // Allow access if user is admin
    }
  }, [auth]);

  // Fetch orders with proper JWT token
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://grocery-grove.onrender.com/api/v1/auth/all-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    if (isAdmin && token) getOrders();
  }, [isAdmin, token]); // Trigger getOrders when admin status or token changes

  // Handle status change
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://grocery-grove.onrender.com/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        }
      );
      getOrders(); // Refresh orders after update
      toast.success("Order status updated");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  if (!isAdmin) return null; // Prevent rendering if user is not admin

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((o, i) => (
              <div key={o._id} className="border shadow mb-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
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
                      <td>{o?.products?.map((p) => p.name).join(", ")}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
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
                            className="card-img-top"
                            src={p.image}
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <h6>Name: {p.name}</h6>
                          <p>Description: {p.description.substring(0, 30)}</p>
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

export default Adminorders;
