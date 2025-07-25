import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);

  const {
    deleteProductItem,
    getLoggedUserCart,
    updateCartItemCount,
    deleteAll,
  } = useContext(CartContext);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    setCartDetails(response.data.data);
  }

  async function deleteProducts() {
    let response = await deleteAll();
    setCartDetails(response.data.data);
  }

  async function deleteProduct(productId) {
    let response = await deleteProductItem(productId);
    setCartDetails(response.data.data);
  }

  async function getUpdateCartCount(productId, count) {
    if (count < 1) return;
    let response = await updateCartItemCount(productId, count);
    setCartDetails(response.data.data);
  }

  function handleNavigateToCheckout() {
    let nevagate = useNavigate();
    nevagate('/checkout');
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-green-600 py-6">
        Shopping Cart
      </h2>
      <h3 className="text-center text-lg font-light text-gray-700 mb-10">
        Total Cart Price:{' '}
        <span className="font-bold text-gray-900">
          {cartDetails?.totalCartPrice} EGP
        </span>
      </h3>

      {/* Desktop/Table View */}
      <div className="overflow-x-auto sm:rounded-lg hidden sm:block">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm text-left text-gray-600 dark:text-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3 text-center">Qty</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products.map((product) => (
              <tr
                key={product.product.id}
                className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-32 h-[200px] object-cover rounded-lg shadow"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center space-x-2">
                    <button
                      onClick={() =>
                        getUpdateCartCount(product.product.id, product.count - 1)
                      }
                      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400 transition"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-semibold">{product.count}</span>
                    <button
                      onClick={() =>
                        getUpdateCartCount(product.product.id, product.count + 1)
                      }
                      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-700 text-green-600 dark:text-green-400 transition"
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteProduct(product.product.id)}
                    className="inline-flex items-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 transition font-semibold"
                    aria-label="Remove product"
                  >
                    <FaTrashAlt className="mr-1" /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Actions for desktop */}
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={deleteProducts}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Delete All Products
          </button>
          <a
            href="/checkout"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Proceed to Checkout
          </a>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-8">
        {cartDetails?.products.map((product) => (
          <div
            key={product.product.id}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-5 shadow-lg"
          >
            <div className="flex items-center space-x-5">
              <img
                src={product.product.imageCover}
                alt={product.product.title}
                className="w-24 h-24 object-cover rounded-lg shadow"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {product.product.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                  {product.price} EGP
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      getUpdateCartCount(product.product.id, product.count - 1)
                    }
                    className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400 transition"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-semibold text-lg">{product.count}</span>
                  <button
                    onClick={() =>
                      getUpdateCartCount(product.product.id, product.count + 1)
                    }
                    className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-700 text-green-600 dark:text-green-400 transition"
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right mt-4">
              <button
                onClick={() => deleteProduct(product.product.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-semibold transition"
              >
                <FaTrashAlt className="inline mr-1" /> Remove
              </button>
            </div>
          </div>
        ))}

        {/* Actions for mobile */}
        <div className="space-y-4">
          <button
            onClick={deleteProducts}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Delete All Products
          </button>
          <button
            onClick={handleNavigateToCheckout}
            className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
