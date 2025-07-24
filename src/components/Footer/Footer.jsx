import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';

const pages = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/cart', label: 'Cart' },
  { path: '/brands', label: 'Brands' },
  { path: '/products', label: 'Products' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }
    setMessage(`Thank you for subscribing, ${email}!`);
    setEmail('');
  }

  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700 shadow-inner">
      <div className="max-w-screen-xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
          {/* Left Column: Logo + Description */}
          <div className="max-w-sm mx-auto md:mx-0 text-center md:text-left">
            <NavLink
              to="/"
              className="flex items-center justify-center md:justify-start space-x-3 mb-5"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Fresh Cart Logo"
                className="h-10 w-auto"
              />
              <span className="text-3xl font-extrabold text-white tracking-wide select-none">
                Fresh Cart
              </span>
            </NavLink>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Your one-stop shop for groceries, electronics, fashion, and more.
              Quality products at your doorstep.
            </p>
          </div>

          {/* Middle Column: Pages Links */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Pages
            </h3>
            <ul className="space-y-3">
              {pages.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `text-gray-400 hover:text-blue-500 transition ${
                        isActive ? 'text-blue-400 font-semibold' : ''
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Social + Subscription */}
          <div className="mx-auto md:mx-0 text-center md:text-left space-y-8">
            {/* Social Icons */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-start space-x-6 text-2xl">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-blue-600 transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-gray-400 hover:text-black transition"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-gray-400 hover:text-red-600 transition"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="max-w-xs mx-auto md:mx-0">
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
                Subscribe to our Newsletter
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Subscribe
                </button>
                {message && (
                  <p className="text-green-400 text-sm mt-1">{message}</p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-14 border-t border-gray-700 pt-8 text-center text-sm text-gray-500 select-none">
          © {new Date().getFullYear()}{' '}
          <NavLink to="/" className="hover:underline text-white font-semibold">
            Fresh Cart™
          </NavLink>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
