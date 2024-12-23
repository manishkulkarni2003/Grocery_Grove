import React from 'react';
import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import Pagenotfound from "./pages/Pagenotfound"
import Register from "./pages/Auth/Register"
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import Forgotpassword from './pages/Auth/Forgotpassword';
import Adminroute from './components/routes/Adminroute';
import Admindashboard from './pages/Admin/Admindashboard';
import Createcategory from './pages/Admin/Createcategory';
import Createproduct from './pages/Admin/Createproduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import Updateproduct from './pages/Admin/Updateproduct';
import Searchpage from './pages/Searchpage';
import Productdetails from './pages/Productdetails';



function App() {
  

  return(
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/product/:slug" element={<Productdetails/>}/>
      <Route path="/search" element={<Searchpage/>}/>
      
      <Route path='/dashboard'  element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>}/>

      <Route path="user/orders" element={<Orders/>}/>

      <Route path="user/profile" element={<Profile/>}/>

      </Route>

      <Route path="/dashboard" element={<Adminroute/>}>
      <Route path="admin" element={<Admindashboard/>}/>
      <Route path="admin/create-category" element={<Createcategory/>}/>
      <Route path="admin/create-product" element={<Createproduct/>}/>
      <Route path="admin/product/:slug" element={<Updateproduct/>}/>
      <Route path="admin/products" element={<Products/>}/>
      <Route path="admin/users" element={<Users/>}/>
      </Route>

      
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<Forgotpassword/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="/*" element={<Pagenotfound/>}/>
    </Routes>
    
    </>
  )
}

export default App
