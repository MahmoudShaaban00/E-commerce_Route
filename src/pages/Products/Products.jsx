import React, { useContext, useState } from 'react';
import Style from './Products.module.css';
import useProducts from '../../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { FaStar, FaSpinner } from "react-icons/fa";
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function Products(props) {
  const { addProductToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  let { data, isLoading } = useProducts();

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);

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
      setLoading(false);
      setCurrentProductId(null);
    }
  }

  if (isLoading) {
    return (
      <div className='py-8 w-full flex justify-center'>
        <ClimbingBoxLoader color='green' />
      </div>
    );
  }

  return (
    <div className='row'>
      {data?.data.data.map((product) => (
        <div key={product.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-4'>
          <div className='product py-4'>
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img className='w-full' src={product.imageCover} alt={product.title} />
              <span className='text-lg font-light text-green-600 mt-4'>{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>
                {product.title.split(' ').slice(0, 2).join(' ')}
              </h3>
              <div className='flex justify-between'>
                <span>{product.price} EGP</span>
                <span className='flex justify-between'>
                  {product.ratingsAverage} <span className='px-2 text-yellow-600'><FaStar /></span>
                </span>
              </div>
            </Link>
            <button
              onClick={() => addProduct(product.id)}
              className='btn'
              disabled={loading && currentProductId === product.id}
            >
              {loading && currentProductId === product.id ? (
                <FaSpinner className='mx-auto animate-spin' />
              ) : (
                'add to cart'
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
