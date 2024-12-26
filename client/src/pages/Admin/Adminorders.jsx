import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/Adminmenu.jsx";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
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
  const token = auth?.token;

  // Check if the user is an admin
  useEffect(() => {
    if (auth?.user?.role !== 1) {
      toast.error("You are not authorized to access this page.");
      window.location.href = "/";
    }
  }, [auth]);

  // Fetch orders with proper JWT token
  const getOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching orders with token:', token); // Debug log
      const response = await axios.get(
        "https://grocery-grove.onrender.com/api/v1/auth/all-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data); // Debug log
      setOrders(response.data);
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError(error.response?.data?.message || 'Failed to load orders');
      toast.error(error.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);

  const handleChange = async (orderId, value) => {
    try {
      const response = await axios.put(
        `https://grocery-grove.onrender.com/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Status update response:', response.data); // Debug log
      getOrders();
      toast.success("Order status updated");
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (!auth?.user?.role === 1) return null;

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {loading ? (
            <div>Loading orders...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            // Rest of your rendering code remains the same
            orders.map((o, i) => (
              <div key={o._id} className="border shadow mb-3">
                {/* Existing table and product display code */}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;