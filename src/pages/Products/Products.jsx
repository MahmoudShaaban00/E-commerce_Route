import React, { useEffect, useState } from 'react';
import Style from './Products.module.css';
import useProducts from '../../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { ClimbingBoxLoader } from 'react-spinners';




export default function Products(props) {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
    let {data , isError , error , isLoading , isFetching}=useProducts();

    if(isLoading){
      return <div className='py-8 w-full flex justify-center'>
        <ClimbingBoxLoader  color='green'/>
      </div>
    }

  return <>
  {<div className='row'>
    {data?.data.data.map((product)=>  <div key={product.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-4'>
        <div className='product py-4'>
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          
          <img className='w-full' src={product.imageCover} alt={product.title} />
          <span className='text-lg font-light text-green-600 mt-4'>{product.category.name}</span>
          <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
          
          <div className='flex justify-between'>
            <span>{product.price} EGP</span>
            <span className='flex justfiy-between'>{product.ratingsAverage} <span className='px-2 text-yellow-600'><FaStar /></span></span>
          </div>

          <button className='btn'>add to cart</button>
          </Link>
        </div>
      </div>
)}
  </div>}

    </>
}