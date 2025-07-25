import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function getAllOrders() {
    try {
      const userId = localStorage.getItem('UserId');
      if (!userId) throw new Error('User ID not found in localStorage');

      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );

      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Could not load your orders. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📦 Your Orders</h2>

      {loading && <p className="text-blue-600 text-lg">Loading orders...</p>}

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      )}

      {orders.map((order, index) => (
        <div
          key={order._id || index}
          className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow border border-gray-300"
        >
          <div className="mb-4">
            <p className="text-gray-800">
              <span className="font-semibold">🆔 Order ID:</span> {order._id}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">💰 Total:</span>{' '}
              <span className="text-green-600 font-bold">{order.totalOrderPrice} EGP</span>
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">💳 Payment:</span> {order.paymentMethodType}
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-1">🛍 Products</h3>

            {order.cartItems?.map((item, idx) => (
              <div
                key={item._id || idx}
                className="flex items-center gap-4 p-3 border rounded-lg bg-white shadow-sm"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h4 className="text-gray-800 font-medium">{item.product.title}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: <span className="font-semibold">{item.count}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: <span className="font-semibold">{item.price} EGP</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
