import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { numOfCartItems, getLoggedUserCart } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  function LogOut() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login');
  }

  useEffect(() => {
    if (userLogin) {
      getLoggedUserCart();
    }
  }, [userLogin]);

  return (
    <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-6">
          <img src={logo} alt="fresh cart logo" className="w-28 md:w-32" />
        </div>

        {/* Hamburger */}
        <div className="block md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:text-green-600 hover:border-green-600 focus:outline-none"
          >
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
          {/* Left Links */}
          {userLogin !== null && (
            <ul className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left mt-4 md:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-4 text-gray-900 hover:text-green-600 font-medium ${isActive ? 'text-green-700' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-4 text-gray-900 hover:text-green-600 font-medium ${isActive ? 'text-green-700' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative block py-2 px-4 text-gray-900 hover:text-green-600 font-medium ${isActive ? 'text-green-700' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                      {numOfCartItems}
                    </span>
                  )}
                </NavLink>
              </li>
             
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `block py-2 px-4 text-gray-900 hover:text-green-600 font-medium ${isActive ? 'text-green-700' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </NavLink>
              </li>

               <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `block py-2 px-4 text-gray-900 hover:text-green-600 font-medium ${isActive ? 'text-green-700' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          )}

          {/* Auth Links */}
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 text-center md:text-left mt-4 md:mt-0">
            {userLogin === null ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block py-2 px-4 text-gray-900 hover:text-green-600 font-medium ${isActive ? 'text-green-700' : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `block py-2 px-4 text-gray-900 hover:text-green-600 font-medium ${isActive ? 'text-green-700' : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>

          {/* Logout Button - Right Side */}
          {userLogin !== null && (
            <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-auto flex justify-end">
              <button
                onClick={LogOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-900 hover:text-red-600 font-medium transition duration-200"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
