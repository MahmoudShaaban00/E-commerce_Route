import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { getLoggedUserCart, createCashOrder } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getCart() {
    try {
      const res = await getLoggedUserCart();
      if (res?.data?.data) {
        setCartDetails(res.data.data);
        localStorage.setItem('UserId', res.data.data.cartOwner);
      } else {
        setCartDetails(null);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCartDetails(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required('Details are required'),
      phone: Yup.string().required('Phone is required'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (!cartDetails?._id) {
          alert('No cart found.');
          return;
        }

        const res = await createCashOrder(cartDetails._id, values);
        if (res?.data?.status === 'success') {
          alert('Order placed successfully!');
          navigate('/allorders');
        }
      } catch (err) {
        console.error('Error creating order:', err);
        alert('Order failed!');
      }
    },
  });

  if (loading) {
    return <p className="text-blue-600 text-center mt-10 text-lg">Loading your cart...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 border-b border-gray-300 pb-4 text-center">
        🧾 Checkout
      </h2>

      {cartDetails ? (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-tr from-gray-50 to-gray-100 border border-gray-300 shadow-inner">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">🛒 Your Cart</h3>
          <p className="mb-2">
            <strong>Cart ID:</strong> <span className="text-gray-700">{cartDetails._id}</span>
          </p>
          <p className="mb-4">
            <strong>Total Price:</strong>{' '}
            <span className="text-green-600 font-bold">{cartDetails.totalCartPrice} EGP</span>
          </p>
          <ul className="max-h-48 overflow-y-auto divide-y divide-gray-200">
            {cartDetails.products.map((item) => (
              <li key={item._id} className="flex justify-between py-3">
                <span className="font-medium text-gray-800">{item.product.title}</span>
                <span className="text-gray-600">Qty: {item.count}</span>
                <span className="font-semibold text-green-600">{item.price} EGP</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-600 font-semibold mb-8 text-center">Your cart is empty.</p>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="details"
            className="block mb-2 font-semibold text-gray-700"
          >
            Address Details
          </label>
          <input
            type="text"
            name="details"
            id="details"
            placeholder="Street, building, floor..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            className={`w-full p-3 rounded-xl border-2 shadow-sm transition ${
              formik.touched.details && formik.errors.details
                ? 'border-red-400 focus:ring-red-300'
                : 'border-gray-300 focus:ring-blue-300'
            }`}
          />
          {formik.touched.details && formik.errors.details && (
            <p className="text-red-600 mt-1">{formik.errors.details}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-semibold text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="01XXXXXXXXX"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={`w-full p-3 rounded-xl border-2 shadow-sm transition ${
              formik.touched.phone && formik.errors.phone
                ? 'border-red-400 focus:ring-red-300'
                : 'border-gray-300 focus:ring-blue-300'
            }`}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-600 mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block mb-2 font-semibold text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Cairo, Alexandria..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className={`w-full p-3 rounded-xl border-2 shadow-sm transition ${
              formik.touched.city && formik.errors.city
                ? 'border-red-400 focus:ring-red-300'
                : 'border-gray-300 focus:ring-blue-300'
            }`}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-600 mt-1">{formik.errors.city}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:bg-blue-300 text-white font-extrabold rounded-3xl shadow-lg transition"
        >
          {formik.isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
