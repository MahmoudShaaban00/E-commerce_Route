import React, { useEffect, useState } from 'react';
import Style from './CategoriesSlider.module.css';
import axios from 'axios';
import Slider from "react-slick";

export default function CategoriesSlider() {

  const [categories, setCategories] = useState([]);


  function getCategories( ){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      setCategories(data.data)
    })
    .catch(()=>{

    })
  }

    const [counter, setCounter] = useState(0);
    useEffect(()=>{
      getCategories()
    } , []);

    var settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 8,
      slidesToScroll: 3,
      autoplay:true,
    };

  return <>
  <div className='p-2'>
    <h2 className='py-4 text-xl text-gray-800 text-medium'> Shop Popular Categories</h2>
   <Slider {...settings}>
    {categories.map((category)=> <div key={category._id} className={`${Style.category} p-2`}>
      <img className='category-img w-full' src={category.image} alt={category.name} />
      <h3 className='font-light mt-2'>{category.name}</h3>
    </div>)}
    </Slider>
    </div>
  </>
}
