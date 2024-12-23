import React from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'

const Orders = () => {
  return (
    <Layout title="Orders-Grocery Grove">
        <div className="container-fluid p-3 m-3">
            <div className="row">
            <div className="col-md-3">
            <Usermenu/>
            </div>
            <div className="col-md-9">
            <h1>All Orders</h1>
            </div>

            </div>
        </div>
      
    </Layout>
  )
}

export default Orders