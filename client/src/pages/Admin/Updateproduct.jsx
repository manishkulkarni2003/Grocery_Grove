import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';

const {Option}=Select

const Updateproduct = () => {
    const navigate =useNavigate()
    const params=useParams();


  const [categories,setCategories]=useState([]);
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("")
  const [quantity,setQuantity]=useState("")
  const [shipping,setShipping]=useState("")

  const [image,setImage]=useState("")

  const[id,setId]=useState("")





//get single product
const getSingleProduct=async()=>{
    try{
        const {data} =await axios.get(`https://grocery-grove.onrender.com/api/v1/product/get-product/${params.slug}`)

        setName(data.product.name);
        setId(data.product._id)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setShipping(data.product.shipping)
        setCategory(data.product.category._id)

    }catch(err){
        console.log(err)

    }
}

useEffect(()=>{
    getSingleProduct();
},[])



  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://grocery-grove.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create Product
  const handleUpdate=async(e)=>{
    e.preventDefault();

    try{
      const productData=new FormData();
      productData.append('name',name)
      productData.append('description',description)
      productData.append('price',price)
      productData.append('quantity',quantity)
      image && productData.append('image',image)
      productData.append('category',category)


      const{data}=await axios.put(`https://grocery-grove.onrender.com/api/v1/product/update-product/${id}`,productData)
      if(data?.success){
        toast.error(data?.message)

      }else{
        
        toast.success("Product Updated SuccessFully");
        navigate('/dashboard/admin/products')
        
      }
      //small Bug in the toast
    }catch(err){
      console.log(err);
      toast.error("Error While Creating the Product")

    }
  }

  //delete Product
  const handleDelete=async()=>{
    try{
        let answer =window.prompt("Are You Sure You Want to Delete This Product? ")
        if(!answer)return 

        const {data} =await axios.delete(`https://grocery-grove.onrender.com/api/v1/product/delete-product/${id}`)

        toast.success("Product Deleted Successfully")
        navigate('/dashboard/admin/products')


    }catch(err){
        console.log(err)
        toast.error("Something Went Wrong")

    }
  }

return (
    <Layout title="Dashboard-create-product">
        <div className="container-fluid m-3 p-3">
       <div className="row">
            <div className="col-md-3">
            <Adminmenu/>
            </div>
            <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select bordered={false}placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{
                setCategory(value)
              }}
              value={category}>
                {categories.map(c=>(
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}

              </Select>
              <div className="mb-3">
                <label  className='btn btn-outline-secondary col-md-12'>
                  {image?image.name:"Upload Image"} 
                <input type="file" name='photo' accept='image/*' onChange={(e)=>{
                  setImage(e.target.files[0])
                }} hidden />
                </label>
              </div>
              <div className="mb-3">{image ?(
                <div className="text-center">
                  <img src={URL.createObjectURL(image)} alt="Product Photo" height={'200px'} className='img img-responsive' />
                </div>
              ):(
<div className="text-center">
                  <img src={id} alt="Product Photo" height={'200px'} className='img img-responsive' />
                </div>
              )}</div>
            </div>
            <div className="mb-3">
              <input type="text" value={name} placeholder='write a name ' className='form-control' onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" value={description} placeholder='write a description ' className='form-control' onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" value={price} placeholder='Price ' className='form-control' onChange={(e)=>setPrice(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" value={quantity} placeholder='Quantity ' className='form-control' onChange={(e)=>setQuantity(e.target.value)} />
            </div>
            <div className="mb-3">
              <Select
              bordered={false}
              placeholder="Select Shipping"
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value)=>{
                setShipping(value)
              }}
              value={shipping?"yes":"No"}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
             <button className='btn btn-primary' onClick={handleUpdate}>
              UPDATE PRODUCT</button> 
            </div>
            <div className="mb-3">
             <button className='btn btn-danger' onClick={handleDelete}>
              DELETE PRODUCT</button> 
            </div>
            </div>
        </div>
        </div>

    </Layout>
  )
}

export default Updateproduct
