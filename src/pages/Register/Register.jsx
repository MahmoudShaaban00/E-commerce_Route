import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(10, 'Name must be at most 10 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Phone number is invalid')
      .required('Phone is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase letter and be 6-11 chars')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      axios
        .post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        .then((response) => {
          if (response.data.message === 'success') {
            localStorage.setItem('userToken', response.data.token);
            setuserLogin(response.data.token);
            toast.success('Registration successful!');
            navigate('/login');
            console.log('Registration successful:', response.data);
          }
        })
        .catch((error) => {
          const response = error.response;
          let errorMessage = 'Something went wrong. Please try again.';

          if (response) {
            if (response.data?.message) {
              errorMessage = response.data.message;
            } else if (typeof response.data === 'string') {
              errorMessage = response.data;
            }
            errorMessage += ` (Status: ${response.status})`;
          } else if (error.message) {
            errorMessage = error.message;
          }

          toast.error(errorMessage, { duration: 5000 });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-200 rounded-lg shadow-md mt-10 font-sans">
      <h3 className="text-3xl font-extrabold mb-8 text-green-700 text-center">Register</h3>

      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Name Input */}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={formik.touched.name && formik.errors.name ? 'true' : undefined}
            aria-describedby="name-error"
            className={`w-full p-3 rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              formik.touched.name && formik.errors.name
                ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <div id="name-error" className="text-red-600 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-1 font-semibold text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={formik.touched.phone && formik.errors.phone ? 'true' : undefined}
            aria-describedby="phone-error"
            className={`w-full p-3 rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              formik.touched.phone && formik.errors.phone
                ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
            }`}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div id="phone-error" className="text-red-600 text-sm mt-1">
              {formik.errors.phone}
            </div>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={formik.touched.email && formik.errors.email ? 'true' : undefined}
            aria-describedby="email-error"
            className={`w-full p-3 rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div id="email-error" className="text-red-600 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
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
            aria-invalid={formik.touched.password && formik.errors.password ? 'true' : undefined}
            aria-describedby="password-error"
            className={`w-full p-3 rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <div id="password-error" className="text-red-600 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-7">
          <label htmlFor="rePassword" className="block mb-1 font-semibold text-gray-700">
            Confirm Password
          </label>
          <input
            id="rePassword"
            name="rePassword"
            type="password"
            placeholder="Confirm your password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={formik.touched.rePassword && formik.errors.rePassword ? 'true' : undefined}
            aria-describedby="rePassword-error"
            className={`w-full p-3 rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              formik.touched.rePassword && formik.errors.rePassword
                ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
            }`}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div id="rePassword-error" className="text-red-600 text-sm mt-1">
              {formik.errors.rePassword}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full sm:w-auto px-5 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-md focus:outline-none focus:ring-4 focus:ring-green-400 transition-colors duration-300"
        >
          {formik.isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
