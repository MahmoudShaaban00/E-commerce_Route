import React, { useEffect, useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';


export default function Categories() {
    const [categories, setCategories] = useState(null);

   async function getcategories(){
       await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
       .then(({data}) => {
        console.log(data.data)
        setCategories(data.data)
       })
       .catch((error) => console.log(error))
    }
    useEffect(()=>{
      getcategories()
    } , []);
  return <>
 
 <h2 className='mt-9 ms-6 text-green-700 text-xl' >This Is a Show For You Our Product Categories Press The Button Show Products</h2>

    <div className='row'>
    {categories?.map((product)=> <div className='w-1/5 p-2 my-5' key={product._id}>
      


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
      <a href="/products" className="mx-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Show Product</a>
  </div>
</div>

</div>)}
      
    </div>
    </>
}
