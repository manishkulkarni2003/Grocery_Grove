import React from 'react'
import { NavLink } from 'react-router-dom'
const Adminmenu = () => {
  return (
    <>
    <div className="text-center">

    
      <ul className="list-group">
  
    <h4>Admin Panel</h4>
  <NavLink to='/dashboard/admin/create-category'>
  <li className="list-group-item active">Create Category</li>
  </NavLink>

  <NavLink to='/dashboard/admin/create-product'>
  <li className="list-group-item">Create Product</li>
  </NavLink>

  <NavLink to='/dashboard/admin/products'>
  <li className="list-group-item">Products</li>
  </NavLink>

  <NavLink to='/dashboard/admin/users'>
  <li className="list-group-item">Users</li>
  </NavLink>
  
</ul>
</div>

    </>
  )
}

export default Adminmenu
