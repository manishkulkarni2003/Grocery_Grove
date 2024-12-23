import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Adminmenu from '../../components/Layout/Adminmenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import Categoryform from '../../components/Form/Categoryform';
import{ Modal } from "antd";





const Createcategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState("")

  const [visible ,setVisible] = useState(false);

  const [selected,setSelected]=useState(null)

  const [updatedName,setUpdatedName]=useState("")



  //handle form 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{

      const {data}=await axios.post("http://localhost:8080/api/v1/category/create-category",{name})

      if(data?.success){
        toast.success(`${name} is Created`);
        getAllCategory();
      }else{
        toast.error(data.message)
      }



    }catch(err){
      console.log(err);
      toast.error("Something went Wrong In Input Form")
    }

  }




  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data.success) {
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


  //update Category
  const handleUpdate=async(e)=>{
    e.preventDefault();

    try{
      
      const {data}=await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("")
        setVisible(false);
        getAllCategory();
      }else{
        toast.error(data.message)
      }



    }catch(err){
      console.log(err);
      toast.error("Something Went Wrong While Updating")
    }
  }
  //deleter Category
  const handleDelete=async(pId)=>{
    

    try{
      
      const {data}=await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pId}`);
      if(data.success){
        toast.success(`Category is Deleted`);
        
        
        
        getAllCategory();
      }else{
        toast.error(data.message)
      }



    }catch(err){
      console.log(err);
      toast.error("Something Went Wrong While Deleting")
    }
  }





  return (
    <Layout title="Dashboard-create-category">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <Categoryform
               handleSubmit= {handleSubmit}
               value={name}  setValue={setName}/>
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{
                          setVisible(true);
                          setUpdatedName(c.name)
                          setSelected(c)

                        }}>Edit</button>

                        <button className="btn btn-danger ms-2" onClick={()=>{
                        handleDelete(c._id)  
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>{
              setVisible(false)
            }} footer={null}
            visible={visible} >
              <Categoryform
              value={updatedName} setValue={setUpdatedName}handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createcategory;
