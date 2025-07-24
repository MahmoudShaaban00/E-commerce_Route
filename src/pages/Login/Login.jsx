import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const { setuserLogin } = useContext(UserContext);
  const [apiError, setapiError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start uppercase and be 6-11 chars')
      .required('Password is required'),
  });

  function handleLogin(formValues, { setSubmitting }) {
    setapiError('');

    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
      .then((response) => {
        if (response.data.message === 'success') {
          localStorage.setItem('userToken', response.data.token);
          setuserLogin(response.data.token);
          navigate('/');
          console.log('Login successful:', response.data);
        }
      })
      .catch((error) => {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;
        const serverErrors = error.response?.data?.errors;
        const networkError = error.message;

        let detailedMessage = '';

        if (serverMessage) detailedMessage += serverMessage;
        if (status) detailedMessage += ` (Status code: ${status})`;
        if (serverErrors && typeof serverErrors === 'object') {
          detailedMessage += '\nDetails:\n';
          for (const [field, messages] of Object.entries(serverErrors)) {
            if (Array.isArray(messages)) {
              detailedMessage += `- ${field}: ${messages.join(', ')}\n`;
            } else {
              detailedMessage += `- ${field}: ${messages}\n`;
            }
          }
        }
        if (!detailedMessage) detailedMessage = networkError || 'Something went wrong. Please try again.';

        toast.error(
          <div style={{ whiteSpace: 'pre-line' }}>{detailedMessage}</div>,
          {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

        setapiError(detailedMessage);
        setSubmitting(false);
      });
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <ToastContainer />

<div className="max-w-md mx-auto mt-20 p-8 bg-gray-200 rounded-lg shadow-lg text-gray-900">

  {apiError && (
    <div
      className="mb-6 p-4 bg-red-600 text-white rounded-lg whitespace-pre-line"
      role="alert"
    >
      {apiError.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )}

  <h3 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">Login Now</h3>

  <form onSubmit={formik.handleSubmit} noValidate>
    {/* Email */}
    <div className="mb-6">
      <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full px-4 py-3 rounded-md border ${
          formik.touched.email && formik.errors.email
            ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
      {formik.touched.email && formik.errors.email && (
        <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
      )}
    </div>

    {/* Password */}
    <div className="mb-6">
      <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full px-4 py-3 rounded-md border ${
          formik.touched.password && formik.errors.password
            ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
      {formik.touched.password && formik.errors.password && (
        <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={formik.isSubmitting}
      className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-white font-semibold text-lg transition-colors duration-300"
    >
      {formik.isSubmitting ? 'Logging in...' : 'Login'}
    </button>
  </form>
</div>

    </>
  );
}
