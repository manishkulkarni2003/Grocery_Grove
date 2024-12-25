import {useState,useEffect} from 'react'
import axios from "axios"


export default function useCategory(){
  const [categories,setCategories]=useState([])  

//get categories

const getCategories =async()=>{
    try{
        const {data} =await axios.get('https://grocery-grove.onrender.com/api/v1/category/get-category')

        setCategories(data?.category)
    }catch(err){
        console.log(err)

    }
}
    useEffect(()=>{
        getCategories()
    },[]);
    return categories;

}