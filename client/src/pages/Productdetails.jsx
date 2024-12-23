import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Productdetails = () => {

    const params=useParams();


    const [product,setProduct]=useState({})

    const [relatedProduct,setRelatedProduct] =useState([])


    useEffect(()=>{
       if(params?.slug) getProduct();
    },[params?.slug])

    //get Product
    const getProduct =async()=>{
        try{

            const {data}=await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProduct(data?.product._id,data?.product.category._id)

        }catch(err){
            console.log(err)

        }
    }

    //get similar product
    const getSimilarProduct=async(pid,cid)=>{
        try{
            const {data}=await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`)

            setRelatedProduct(data?.product)

        }catch(err){
            console.log(err)
        }
    }


  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
            <img src={product.image} className='card-img-top' alt={product.name} height={'300px'} width={'350px'} />
        </div>
        <div className="col-md-6 text-center">
        <h1>Product Details</h1>
        <h3>Product Name:{product.name}</h3>
        <h4>Product Description:{product.description}</h4>
        <h4>Product Price:₹{product.price}</h4>
        <h5>Product Unit:{product.quantity}</h5>
        <h5>Product Category:{product?.category?.name}</h5>
        <button className='btn btn-secondary ms-1'>ADD TO CART</button>
        
        </div>
      </div>
      <hr />
      <div className="row container text-center ">
        <h6>
            Similar Products
        </h6>
        {relatedProduct.length<1 && (<p>No Similar Product Found</p>)}

        <div className="d-flex flex-wrap
          ">
            {relatedProduct?.map(p=>(
    

    
    <div className="card m-2" style={{width: '18rem'}} >
  <img className="card-img-top" src={p.image} alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,45)}...</p>
    <p className="card-text">₹{p.price}</p>
    
    <button className="btn btn-secondary ms-1">Add to Cart</button>
    
  </div>
</div>


))}
          </div>
      </div>
      
    </Layout>
  )
}

export default Productdetails
