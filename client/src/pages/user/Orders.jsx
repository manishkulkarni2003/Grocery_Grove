import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Usermenu from '../../components/Layout/Usermenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from "moment";
import { toast } from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching orders with token:', auth?.token);

      const { data } = await axios.get('https://grocery-grove.onrender.com/api/v1/auth/orders', {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });

      console.log('Orders received:', data);
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Error fetching orders');
      toast.error(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'bg-warning';
      case 'shipped':
        return 'bg-info';
      case 'delivered':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <Layout title="Orders-Grocery Grove">
        <div className="container-fluid py-4">
          <div className="text-center">Loading orders...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Orders-Grocery Grove">
        <div className="container-fluid py-4">
          <div className="alert alert-danger">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Orders-Grocery Grove">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">My Orders</h2>
                {orders?.length === 0 ? (
                  <div className="text-center">No orders found</div>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="card mb-4 shadow-sm">
                      <div className="card-header bg-light">
                        <div className="row align-items-center">
                          <div className="col">
                            <strong>Order ID: </strong>{order._id}
                          </div>
                          <div className="col text-end">
                            <span className={`badge ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <strong>Order Date: </strong>
                            {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                          </div>
                          <div className="col-md-6 text-md-end">
                            <strong>Total Amount: </strong>
                            ${order.payment.amount}
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-sm table-bordered">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((item) => (
                                <tr key={item._id}>
                                  <td>{item.name}</td>
                                  <td>${item.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>${item.price * item.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3">
                          <strong>Shipping Address: </strong>
                          {order.shippingAddress}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;