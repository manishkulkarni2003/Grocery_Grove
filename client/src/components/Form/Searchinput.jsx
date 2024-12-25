import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Searchinput = () => {
    const [values,setValues]=useSearch()
    const navigate=useNavigate()

    const handleSearch =async(e)=>{
        try{
            e.preventDefault();
            const {data} =await axios.get(`https://grocery-grove.onrender.com/api/v1/product/search/${values.keyword}`);
            setValues({...values,results:data});
            navigate('/search')

        }catch(err){
            console.log(err)

        }
    }


  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e)=>{
    setValues({...values,keyword:e.target.value})
  }} />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

    </div>
  )
}

export default Searchinput
