import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

// Lazy-loaded components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Policy = React.lazy(() => import('./pages/Policy'));
const Pagenotfound = React.lazy(() => import('./pages/Pagenotfound'));
const Register = React.lazy(() => import('./pages/Auth/Register'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Dashboard = React.lazy(() => import('./pages/user/Dashboard'));
const PrivateRoute = React.lazy(() => import('./components/routes/Private'));
const Forgotpassword = React.lazy(() => import('./pages/Auth/Forgotpassword'));
const Adminroute = React.lazy(() => import('./components/routes/Adminroute'));
const Admindashboard = React.lazy(() => import('./pages/Admin/Admindashboard'));
const Createcategory = React.lazy(() => import('./pages/Admin/Createcategory'));
const Createproduct = React.lazy(() => import('./pages/Admin/Createproduct'));
const Users = React.lazy(() => import('./pages/Admin/Users'));
// const Orders = React.lazy(() => import('./pages/user/Orders'));
const Profile = React.lazy(() => import('./pages/user/Profile'));
const Products = React.lazy(() => import('./pages/Admin/Products'));
const Updateproduct = React.lazy(() => import('./pages/Admin/Updateproduct'));
const Searchpage = React.lazy(() => import('./pages/Searchpage'));
const Productdetails = React.lazy(() => import('./pages/Productdetails'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Categoryproduct = React.lazy(() => import('./pages/Categoryproduct'));
const Cartpage = React.lazy(() => import('./pages/Cartpage'));
// const Adminorders = React.lazy(() => import('./pages/Admin/Adminorders'));
import "./pages/Admin/Adminorders"
import "./pages/user/Orders"

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<Productdetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/category/:slug" element={<Categoryproduct />} />
        <Route path="/search" element={<Searchpage />} />
        
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<Adminroute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-category" element={<Createcategory />} />
          <Route path="admin/create-product" element={<Createproduct />} />
          <Route path="admin/product/:slug" element={<Updateproduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<Adminorders />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
