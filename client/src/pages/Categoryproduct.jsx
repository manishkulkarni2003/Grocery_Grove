import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'




const Categoryproduct = () => {

    const navigate =useNavigate();

    const params =useParams();

    const [products,setProducts]=useState([])
    const [categories,setCategories]=useState([])


    useEffect(()=>{
        if(params?.slug)getProductByCategory()
    },[params?.slug])

    const getProductByCategory=async()=>{
        try{
            const {data} =await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategories(data?.category)




        }catch(err){
            console.log(err)
        }
    }


  return (
    <Layout>
      <div className="container mt-4">
        <h4 className='text-center'>Category-{categories?.name}</h4>
        <h6 className='text-center'>{products?.length} result found</h6>
        <div className="row">
        <div className="d-flex flex-wrap
          ">
            {products?.map(p=>(
    

    
    <div className="card m-2" style={{width: '18rem'}} >
  <img className="card-img-top" src={p.image} alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,45)}...</p>
    <p className="card-text">₹{p.price}</p>
    <button className="btn btn-primary ms-1" 
    onClick={()=>navigate(`/product/${p.slug}`)
    }
    >More Details</button>
    <button className="btn btn-secondary ms-1">Add to Cart</button>
    
  </div>
</div>


))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length <total &&(
              <button className="btn btn-warning" onClick={(e)=>{
                e.preventDefault();
                setPage((prevPage)=>page+1);
              }}>
                {loading?"Loading...":
                "LoadMore"}
              </button>
            )}
          </div> */}
        </div>
        </div>
      
    </Layout>
  )
}

export default Categoryproduct
