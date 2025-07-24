import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  // Extract necessary functions from CartContext
  const { getLoggedUserCart, createCashOrder } = useContext(CartContext);

  // State to store cart details and loading status
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate()

  // State for success and error messages shown after order submission
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // On component mount, fetch cart data from backend
 useEffect(() => {
  async function fetchCart() {
    try {
      const res = await getLoggedUserCart();

      // ✅ Cart fetched successfully
      if (res?.data?.status === 'success') {
        const cartData = res.data.data;

        setCartDetails(cartData);

        // 🌟 Log and store cart ID
        console.log('%c🛒 Cart Owner:', 'color: #16a34a; font-weight: bold;', cartData.cartOwner);
        console.log('%c💾 Storing Cart ID:', 'color: #2563eb; font-weight: bold;', cartData._id);

        localStorage.setItem('cartId', cartData._id);
        localStorage.setItem('UserId', cartData.cartOwner);

      // 🚫 If cart is empty
      } else if (res?.data?.status === 'empty') {
        setCartDetails(null);
        localStorage.removeItem('cartId');

        console.log('%c🧹 Cart is empty, removing cartId from localStorage', 'color: #f97316');

      // ⚠️ Unknown status
      } else {
        setCartDetails(null);
        console.warn('%c⚠️ Unexpected cart status:', 'color: #eab308;', res?.data?.status);
      }

    } catch (error) {
      // ❌ Error during fetch
      setCartDetails(null);
      console.error('%c❌ Error fetching cart:', 'color: #dc2626;', error);

    } finally {
      // ⏹️ Done loading
      setLoading(false);
    }
  }

  fetchCart();
}, [getLoggedUserCart]);


  // Formik form handler for checkout address, phone, city with validation schema
  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string()
        .min(5, 'Address details must be at least 5 characters')
        .required('Address details are required'),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
        .required('Phone number is required'),
      city: Yup.string()
        .min(2, 'City must be at least 2 characters')
        .required('City is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      // Clear previous messages
      setSuccessMessage('');
      setErrorMessage('');

      // Retrieve cartId from localStorage before creating order
      const storedCartId = localStorage.getItem('cartId');

      // If no cartId, show error message and abort submission
      if (!storedCartId) {
        setErrorMessage('No cart found.');
        return;
      }

      try {
        // Call createCashOrder with cartId and address data
        const res = await createCashOrder(storedCartId, values);

        // On success, show success message and reset form fields
        if (res?.data?.status === 'success') {
          setSuccessMessage('✅ Order placed successfully!');
          resetForm();

        // On failure response, show a generic failure message
        } else {
          setErrorMessage('Failed to place order. Please try again.');
        }
      } catch {
        // Catch network or unexpected errors
        setErrorMessage('An error occurred while placing the order.');
      }
    },
  });

  // Show loading text while cart is being fetched
  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 font-medium">Loading cart...</p>
    );

return (
  <div className="max-w-xl mt-10 mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
    {/* Checkout Header */}
    <h2 className="text-4xl font-extrabold mb-8 text-gray-900 border-b border-gray-300 pb-4 rounded-t-3xl">
      Checkout
    </h2>

    {/* Cart details display */}
    {cartDetails ? (
      <div className="mb-5 bg-gradient-to-tr from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-300 shadow-inner">
        <p className="text-gray-800 mb-2 rounded-md">
          <span className="font-semibold">Cart ID:</span> {cartDetails._id}
        </p>
        <p className="text-gray-800 mb-4 rounded-md">
          <span className="font-semibold">Total Price:</span> {cartDetails.totalCartPrice} EGP
        </p>
        <p className="font-semibold mb-4 text-gray-700">Items:</p>
        <ul className="list-disc list-inside text-gray-700 max-h-56 overflow-y-auto space-y-1">
          {cartDetails.products.map((item) => (
            <li
              key={item._id}
              className="p-3 bg-white rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition-shadow"
            >
              <span className="font-semibold">{item.product.title}</span>
              <span className="text-sm text-gray-600">
                Qty: {item.count}
              </span>
              <span className="text-green-600 font-bold">{item.price} EGP</span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      // Message if no cart data available
      <p className="text-center text-red-600 font-semibold mb-10">No cart found.</p>
    )}

    {/* Success and error messages after submitting order */}
    {successMessage && (
      <div className="mb-8 p-5 bg-green-100 border border-green-400 text-green-800 rounded-xl shadow-md">
        {successMessage}
      </div>
    )}
    {errorMessage && (
      <div className="mb-8 p-5 bg-red-100 border border-red-400 text-red-800 rounded-xl shadow-md">
        {errorMessage}
      </div>
    )}

    {/* Checkout form */}
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      {/* Address details input */}
      <div>
        <label
          htmlFor="details"
          className="block text-gray-800 font-semibold mb-3 text-lg"
        >
          Address Details
        </label>
        <input
          id="details"
          name="details"
          type="text"
          className={`w-full p-4 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 ${
            formik.touched.details && formik.errors.details
              ? 'border-red-400 focus:ring-red-300'
              : 'border-gray-300 focus:ring-blue-300'
          } transition`}
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Street, building, floor..."
        />
        {formik.touched.details && formik.errors.details && (
          <p className="text-red-600 text-sm mt-2 ml-1">{formik.errors.details}</p>
        )}
      </div>

      {/* Phone input */}
      <div>
        <label
          htmlFor="phone"
          className="block text-gray-800 font-semibold mb-3 text-lg"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          className={`w-full p-4 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 ${
            formik.touched.phone && formik.errors.phone
              ? 'border-red-400 focus:ring-red-300'
              : 'border-gray-300 focus:ring-blue-300'
          } transition`}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="01XXXXXXXXX"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-600 text-sm mt-2 ml-1">{formik.errors.phone}</p>
        )}
      </div>

      {/* City input */}
      <div>
        <label
          htmlFor="city"
          className="block text-gray-800 font-semibold mb-3 text-lg"
        >
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          className={`w-full p-4 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 ${
            formik.touched.city && formik.errors.city
              ? 'border-red-400 focus:ring-red-300'
              : 'border-gray-300 focus:ring-blue-300'
          } transition`}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Cairo, Alexandria..."
        />
        {formik.touched.city && formik.errors.city && (
          <p className="text-red-600 text-sm mt-2 ml-1">{formik.errors.city}</p>
        )}
      </div>

      {/* Submit button */}
      <button onClick={()=> navigator('/allorders')}
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:bg-blue-300 text-white font-extrabold rounded-3xl shadow-lg transition"
      >
        {formik.isSubmitting ? 'Placing Order...' : 'Place Cash Order'}
      </button>
    </form>
  </div>
);

}
