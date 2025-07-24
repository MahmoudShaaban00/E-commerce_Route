import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';

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

  useEffect(() => {
    getCartItems();
  }, []);

return (
  <div className="p-4 md:p-8 lg:p-12">
    <h2 className="text-2xl sm:text-3xl text-center text-green-600 py-4 font-semibold">
      Shopping Cart
    </h2>
    <h3 className="text-center text-base sm:text-lg font-light text-gray-600 mb-6">
      Total Cart Price: <span className="font-bold">{cartDetails?.totalCartPrice} EGP</span>
    </h3>

    {/* ✅ Desktop/Table View */}
    <div className="overflow-x-auto sm:rounded-lg hidden sm:block">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm text-left text-gray-600 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs sm:text-sm">
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Qty</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.products.map((product) => (
            <tr key={product.product.id} className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              <td className="p-4">
                <img src={product.product.imageCover} alt={product.product.title} className="w-30 h-[200px] object-cover rounded" />
              </td>
              <td className="px-6 py-4">{product.product.title}</td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2 justify-center">
                  <button onClick={() => getUpdateCartCount(product.product.id, product.count - 1)}>−</button>
                  <span>{product.count}</span>
                  <button onClick={() => getUpdateCartCount(product.product.id, product.count + 1)}>+</button>
                </div>
              </td>
              <td className="px-6 py-4">{product.price} EGP</td>
              <td className="px-6 py-4">
                <button onClick={() => deleteProduct(product.product.id)} className="text-red-600">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Actions for mobile */}
      <div className="text-center mt-6 flex justify-center gap-5 ">
        <button
          onClick={deleteProducts}
          className="text-center block  w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Delete All Products
        </button>
        <a
          href="/checkout"
          className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>

    {/* ✅ Mobile View */}
    <div className="sm:hidden space-y-6">
      {cartDetails?.products.map((product) => (
        <div
          key={product.product.id}
          className="bg-white dark:bg-gray-900 border rounded-lg p-4 shadow"
        >
          <div className="flex items-center space-x-4">
            <img
              src={product.product.imageCover}
              alt={product.product.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">{product.product.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{product.price} EGP</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => getUpdateCartCount(product.product.id, product.count - 1)}
                  className="px-2 py-1 border rounded"
                >
                  −
                </button>
                <span>{product.count}</span>
                <button
                  onClick={() => getUpdateCartCount(product.product.id, product.count + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-right mt-2">
            <button
              onClick={() => deleteProduct(product.product.id)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Actions for mobile */}
      <div className="text-center mt-6 space-y-3">
        <button
          onClick={deleteProducts}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Delete All Products
        </button>
        <a
          href="/checkout"
          className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  </div>
);

}
