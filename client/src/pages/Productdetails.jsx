import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../styles/ProductdetailsStyles.css"
import { useCart } from '../context/cart'


const Productdetails = () => {

    const params=useParams();


    const [product,setProduct]=useState({})

    const [relatedProduct,setRelatedProduct] =useState([]);
    const [cart,setcart]=useCart()


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
  <div className="product-details-container">
    <div className="product-main">
      <div className="row">
        <div className="col-md-6">
          <div className="product-image-container">
            <img src={product.image} className="product-image" alt={product.name} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <h4 className="product-price">₹{product.price}</h4>
            <div className="product-meta">
              <h5>Quantity: {product.quantity}</h5>
              <h5>Category: {product?.category?.name}</h5>
            </div>
            <button className="add-to-cart-btn">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>

    <div className="similar-products">
      <h6 className="similar-products-title">Similar Products</h6>
      {relatedProduct.length < 1 && (
        <p className="no-products">No Similar Products Found</p>
      )}
      <div className="similar-products-grid">
        {relatedProduct?.map(p => (
          <div className="product-card" key={p._id}>
            <img className="product-card-image" src={p.image} alt={p.name} />
            <div className="product-card-body">
              <h5 className="product-card-title">{p.name}</h5>
              <p className="product-card-description">
                {p.description.substring(0, 45)}...
              </p>
              <p className="product-card-price">₹{p.price}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</Layout>
  )
}

export default Productdetails
