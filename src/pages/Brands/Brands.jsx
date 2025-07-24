import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';


export default function Brands() {
  const [brands, setBrands] = useState(null);

  async function getBrands(){
      await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({data}) => {
       console.log(data.data)
       setBrands(data.data)
      })
      .catch((error) => console.log(error))
    }

  
   useEffect(()=>{
     getBrands()
   } , []);
  return <>
    <div className='row'>
    {brands?.map((product)=> <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/6 p-4' key={product._id}>
      


 <div className=" w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img style={{width:'100%',height:'200px'}} src={product.image} alt="product image" />
  </a>
  <div className="px-5 pb-5">
    <a href="#">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-3 text-center">{product.name}</h5>
    </a>
    <div className="flex items-center mt-2.5 mb-5">
     
    </div>
      <a href="/products" className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Show Product</a>
  </div>
</div>

</div>)}
      
    </div>

    
      
  </>
}
