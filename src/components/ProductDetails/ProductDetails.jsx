import React, { useEffect, useState, useContext } from 'react';
import Style from './ProductDetails.module.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaSpinner } from "react-icons/fa";
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let { id, category } = useParams();

  const { addProductToCart } = useContext(CartContext);

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch(() => { });
  }

  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        const allProducts = data.data;
        const related = allProducts.filter(
          (product) => product.category.name === category && product.id !== Number(id)
        );
        setRelatedProducts(related);
      })
      .catch(() => { });
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  async function addProduct(productId) {
    setLoadingProductId(productId);

    try {
      let response = await addProductToCart(productId);

      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          duration: 2000,
          position: 'bottom-left',
        });
      } else {
        toast.error(response.data.message, {
          duration: 2000,
          position: 'bottom-left',
        });
      }
    } catch (error) {
      toast.error('Failed to add product to cart', {
        duration: 2000,
        position: 'bottom-left',
      });
    } finally {
      setLoadingProductId(null);
    }
  }

  if (!productDetails) return <div className="p-6 text-center">Loading product...</div>;

  return (
    <>
      <div className='row'>
        <div className='w-1/4'>
          <Slider {...settings}>
            {productDetails.images?.map((src, idx) => (
              <img key={idx} className='w-full' src={src} alt={productDetails.title} />
            ))}
          </Slider>
        </div>

        <div className='w-3/4'>
          <h1 className='text-lg font-normal text-gray-950'>{productDetails.title}</h1>
          <p className='text-gray-700 mt-4 font-light'>{productDetails.description}</p>
          <div className='flex my-4 justify-between'>
            <span>{productDetails.price} EGP</span>
            <span className='flex items-center'>{productDetails.ratingsAverage}
              <span className='px-2 text-yellow-600'><FaStar /></span>
            </span>
          </div>
          <button
            className='btn'
            onClick={() => addProduct(productDetails.id)}
            disabled={loadingProductId === productDetails.id}
          >
            {loadingProductId === productDetails.id ? (
              <FaSpinner className='mx-auto animate-spin' />
            ) : (
              'Add to cart'
            )}
          </button>
        </div>
      </div>

      <div className='row'>
        {relatedProducts.map((product) => (
          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/6 p-4' key={product.id}>
            <div className='product py-4'>
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img className='w-full' src={product.imageCover} alt={product.title} />
                <span className='text-lg font-light text-green-600 mt-4'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-gray-800 mb-4'>
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h3>

                <div className='flex justify-between'>
                  <span>{product.price} EGP</span>
                  <span className='flex items-center'>
                    {product.ratingsAverage}
                    <span className='px-2 text-yellow-600'><FaStar /></span>
                  </span>
                </div>
              </Link>
              <button
                className='btn'
                onClick={() => addProduct(product.id)}
                disabled={loadingProductId === product.id}
              >
                {loadingProductId === product.id ? (
                  <FaSpinner className='mx-auto animate-spin' />
                ) : (
                  'Add to cart'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
