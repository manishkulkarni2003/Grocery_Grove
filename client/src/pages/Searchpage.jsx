import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'



const Searchpage = () => {

    const [values,setValues]=useSearch()

  return (
    <Layout title={"Search results"}>
        <div className="container">

        
        <div className="text-center">   
            <h1>Search Results</h1>
            <h6>
                {values?.results.length<1?"No Prodcuts Found":`found${values?.results.length}`}
            </h6>
            <div className="d-flex flex-wrap mt-6
          ">
            {values?.results.map(p=>(
    

    
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
            </div> 
            </div>


    </Layout>
  )
}

export default Searchpage
