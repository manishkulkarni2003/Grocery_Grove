import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Usermenu from '../../components/Layout/Usermenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('https://grocery-grove.onrender.com/api/v1/auth/orders');
      setOrders(data);
    } catch (err) {
      console.log(err);
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
      default:
        return 'bg-secondary';
    }
  };

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
                {orders?.map((o, i) => (
                  <div key={i} className="card mb-4 shadow-sm">
                    <div className="card-header bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Order #{i + 1}</h5>
                        <span className={`badge ${getStatusBadge(o?.status)}`}>
                          {o?.status}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <small className="text-muted">Order Date:</small>
                          <p className="mb-0">{moment(o?.createdAt).format('MMMM Do YYYY')}</p>
                        </div>
                        <div className="col-md-4">
                          <small className="text-muted">Payment Status:</small>
                          <p className="mb-0">
                            <span className={`badge ${o?.payment.success ? 'bg-success' : 'bg-danger'}`}>
                              {o?.payment.success ? 'Success' : 'Failed'}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-4">
                          <small className="text-muted">Total Items:</small>
                          <p className="mb-0">{o?.products?.length}</p>
                        </div>
                      </div>

                      <div className="table-responsive mb-3">
                        <table className="table table-bordered table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {o?.products?.map((p, index) => (
                              <tr key={index}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="me-3"
                                      style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                      }}
                                    />
                                    <div>
                                      <h6 className="mb-1">{p.name}</h6>
                                      <small className="text-muted">
                                        {p.description.substring(0, 50)}...
                                      </small>
                                    </div>
                                  </div>
                                </td>
                                <td>₹{p.price}</td>
                                <td>{p.quantity}</td>
                                <td>₹{p.price * p.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="d-flex justify-content-end">
                        <div className="text-end">
                          <small className="text-muted">Order Total:</small>
                          <h5 className="mb-0">
                            ₹{o?.products?.reduce((acc, p) => acc + (p.price * p.quantity), 0)}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;