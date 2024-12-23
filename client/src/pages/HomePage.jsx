import React,{useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";

import toast from "react-hot-toast";
import axios from "axios";
import {Checkbox,Radio} from "antd"
import { Prices } from "../components/Prices";



const HomePage = () => {
  

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
      const {data}=await axios.get("http://localhost:8080/api/v1/product/product-count")
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
      const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setProducts([...products,...data?.products]);
      setLoading(false)
    }catch(err){
      console.log(err);
      setLoading(false)
    }
  }



  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
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
      const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);

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
      const {data}=await axios.post('http://localhost:8080/api/v1/product/product-filter',{checked,radio})
      setProducts(data?.products)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <Layout title={"All-Products-Best offers "}>
      <div className="row mt-3">
        <div className="col-md-2">
        <h4 className="text-center">Filter By Category</h4>
        <div className="d-flex flex-column">
        {categories?.map(c=>(
          <Checkbox key={c._id} onChange={(e)=>{
            handleFilter(e.target.checked,c._id)
          }} >
           {c.name} 
          </Checkbox>
        ))}
        </div>

      {/* price filter  */}

        <h4 className="text-center mt-4">Filter By Price</h4>
        <div className="d-flex flex-column">
        <Radio.Group onChange={e=>setRadio(e.target.value)}
        >
          {Prices?.map(p=>(
            <div key={p._id}>
            <Radio value={p.array}>
              {p.name}
            </Radio>
            </div>
          ))}
        </Radio.Group>
        </div>

        <div className="d-flex flex-column">
        <button className="btn btn-danger" onClick={()=>{
          window.location.reload()
        }}>RESET-FILTER</button>
        </div>
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">All Products</h1>

          <div className="d-flex flex-wrap
          ">
            {products?.map(p=>(
    

    
    <div className="card m-2" style={{width: '18rem'}} >
  <img className="card-img-top" src={p.image} alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,45)}...</p>
    <p className="card-text">₹{p.price}</p>
    <button className="btn btn-primary ms-1">More Details</button>
    <button className="btn btn-secondary ms-1">Add to Cart</button>
    
  </div>
</div>


))}
          </div>
          <div className="m-2 p-3">
            {products && products.length <total &&(
              <button className="btn btn-warning" onClick={(e)=>{
                e.preventDefault();
                setPage((prevPage)=>page+1);
              }}>
                {loading?"Loading...":
                "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;