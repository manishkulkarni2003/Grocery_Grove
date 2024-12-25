import React,{useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";

import toast from "react-hot-toast";
import axios from "axios";
import {Checkbox,Radio} from "antd"
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/Homepage.css"




const HomePage = () => {
  
  const navigate=useNavigate();
  const [cart,setCart]=useCart();

  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])

  const[checked,setChecked]=useState([])
  const[radio,setRadio]=useState([])

  const[total,setTotal] =useState(0)
  const[page,setPage]=useState(1);

  const [loading,setLoading]=useState(false)






  //get total count
  const getTotal=async()=>{
    try{
      const {data}=await axios.get("https://grocery-grove.onrender.com/api/v1/product/product-count")
      setTotal(data?.total)

    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    // if(page ===1) return
    
    loadMore()
  },[page])



  //load more
  


  const loadMore=async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`https://grocery-grove.onrender.com/api/v1/product/product-list/${page}`)
      setProducts([...products,...data?.products]);
      setLoading(false)
    }catch(err){
      console.log(err);
      setLoading(false)
    }
  }



  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://grocery-grove.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  


  //get products
  const getAllProducts=async()=>{
    try{
      setLoading(true);
      const {data}=await axios.get(`https://grocery-grove.onrender.com/api/v1/product/product-list/${page}`);

      setProducts(data.products)
      setLoading(false)


    }catch(err){
      setLoading(false)
      console.log(err)
      toast.error("Cannot Fetch the Products")
      
    }
  }

  

  

  const handleFilter=(value,id)=>{
    let all =[...checked]
    if(value){
      all.push(id)
    }else{
      all=all.filter(c=>c!==id)
    }
    setChecked(all)
  }

  useEffect(()=>{
   if(!checked.length ||!radio.length) getAllProducts()
    
  },[])

  useEffect(()=>{
    if(checked.length||radio.length)filterProduct()
  },[checked,radio]);



  //get Filtered product

  const filterProduct =async()=>{
    try{
      const {data}=await axios.post('https://grocery-grove.onrender.com/api/v1/product/product-filter',{checked,radio})
      setProducts(data?.products)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <Layout title={"All-Products-Best offers "}>
      <div className="homepage-container">
        <div className="container">
          <div className="row">
            {/* Filter Sidebar */}
            <div className="col-md-3">
              <div className="filter-sidebar">
                <div className="filter-section">
                  <h4 className="filter-title">Filter By Category</h4>
                  <div className="checkbox-group">
                    {categories?.map(c => (
                      <Checkbox 
                        key={c._id} 
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>
  
                <div className="filter-section">
                  <h4 className="filter-title">Filter By Price</h4>
                  <Radio.Group onChange={e => setRadio(e.target.value)}>
                    {Prices?.map(p => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
  
                <button 
                  className="btn btn-danger reset-filter" 
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            </div>
  
            {/* Products Section */}
            <div className="col-md-9">
              <div className="products-container">
                <h1 className="products-header">All Products</h1>
                
                <div className="products-grid">
                  {products?.map(p => (
                    <div className="product-card" key={p._id}>
                      <img src={p.image} alt={p.name} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="product-title">{p.name}</h5>
                        <p className="product-description">
                          {p.description.substring(0, 45)}...
                        </p>
                        <p className="product-price">₹{p.price}</p>
                        <div className="product-buttons">
                          <button 
                            className="btn details-btn"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          <button 
                            className="btn cart-btn"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem('cart', JSON.stringify([...cart, p]));
                              toast.success("Item Added To Cart");
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
  
                {products && products.length < total && (
                  <div className="load-more-container">
                    <button 
                      className="btn load-more-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;