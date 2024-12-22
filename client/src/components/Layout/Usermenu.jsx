import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <>
    <div className="text-center">

    
      <ul className="list-group">
  
    <h4>Dashboard</h4>
  <NavLink to='/dashboard/user/profile'>
  <li className="list-group-item active">Profile</li>
  </NavLink>

  <NavLink to='/dashboard/user/orders'>
  <li className="list-group-item">Orders</li>
  </NavLink>
  
  
</ul>
</div>

    </>
  )
}

export default Usermenu
