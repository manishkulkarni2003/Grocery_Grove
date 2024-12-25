import React,{useState,useEffect} from 'react'
import Adminmenu from '../../components/Layout/Adminmenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import "../../styles/ProductAdminStyles.css"




const Products = () => {

    const [products,setProducts]=useState([])


    //get all products
    const getAllProducts=async()=>{
        try{
            const {data}=await axios.get("http://localhost:8080/api/v1/product/get-product")
            setProducts(data.products);


        }catch(err){
            console.log(err)
            toast.err("Something Went wrong")
        }
    }

    //lifecycle hook
    useEffect(()=>{
        getAllProducts()
    },[])



  return (
    <Layout>
  <div className="admin-products-container">
    <div className="row">
      <div className="col-md-3">
        <div className="admin-menu-section">
          <Adminmenu/>
        </div>
      </div>
      <div className="col-md-9">
        <div className="products-section">
          <div className="products-header">
            <h1 className="products-title text-center">
              All Products List
            </h1>
          </div>
          <div className="products-grid">
            {products?.map(p => (
              <Link 
                key={p._id} 
                to={`/dashboard/admin/product/${p.slug}`} 
                className="product-link"
              >
                <div className="product-card">
                  <img 
                    className="product-image" 
                    src={p.image} 
                    alt={p.name} 
                  />
                  <div className="product-content">
                    <h5 className="product-name">{p.name}</h5>
                    <p className="product-description">{p.description}</p>
                    <p className="product-price">
                      <span className="price-tag">₹</span>
                      {p.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>
  )
}

export default Products
