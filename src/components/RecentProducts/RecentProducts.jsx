import React, { useContext, useEffect, useState } from 'react';
import Style from './RecentProducts.module.css';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa";



export default function RecentProducts() {

  let {addProductToCart} = useContext(CartContext);
  const [Loading , setIsLoading] = useState(false);
  const [currentProductId , setCurrentProductId]=useState(0)

  async function addProduct(productId){
    setCurrentProductId(productId)

    setIsLoading(true)
    let response = await addProductToCart(productId)

    if(response.data.status === 'success'){
      toast.success(response.data.message , {
        duration:2000,
        position:'bottom-left'
      })
    }
      else{
        toast.error(response.data.message , {
          duration:1000,
          position:'bottom-left'
        })
    }
  }


  function getRecent(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

 let {data , isError , error , isLoading , isFetching} = useQuery({
    queryKey:['recentProducts'],
    queryFn:getRecent,
    select:(data)=> data.data.data,
  })

   /*const [recentProducts, setRecentProducts] = useState([]);
   function getRecentPrroducts(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
        setRecentProducts(data.data)
            })
      .catch((error)=>{
        console.log(error)
      })
    }
       */

    if(isLoading){
      return <div className='py-8 w-full flex justify-center'>
        <ClimbingBoxLoader  color='green'/>
      </div>
    }

  return <>
  {<div className='row'>
    {data.map((product)=>  <div key={product.id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/6 p-4'>
        <div className='product py-4'>
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          
          <img className='w-full' src={product.imageCover} alt={product.title} />
          <span className='text-lg font-light text-green-600 mt-4'>{product.category.name}</span>
          <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
          
          <div className='flex justify-between'>
            <span>{product.price} EGP</span>
            <span className='flex justfiy-between'>{product.ratingsAverage} <span className='px-2 text-yellow-600'><FaStar /></span></span>
          </div>

          </Link>
          <button onClick={()=> addProduct(product.id)} className='btn'>{currentProductId === product.id && Loading? <FaSpinner  className='mx-auto'/> :'add to cart'}</button>
        </div>
      </div>
)}
  </div>}

    </>
}