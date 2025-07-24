import { useState } from 'react'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Brands from './pages/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Notfound from './pages/Notfound/Notfound';
import CounterContextProvider from './context/CounterContext';
import UserContextProvider, { UserContext } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import About from './pages/About/About';
import CheckOut from './pages/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';

let query = new QueryClient()

let x = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'productdetails/:id/:category' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'*' , element:<Notfound/>},
    {path:'about' , element:<ProtectedRoute><About/></ProtectedRoute>},
    {path:'checkout' , element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute>}
  ]}
])
function App() {

  return <QueryClientProvider client={query}>
  <UserContextProvider>
  <CounterContextProvider>
    <CartContextProvider>
   <RouterProvider router={x}></RouterProvider>
   <ReactQueryDevtools initialIsOpen='false'/>
   <Toaster/>
   </CartContextProvider>
   <ReactQueryDevtools />
  </CounterContextProvider>
  </UserContextProvider>
  </QueryClientProvider>
}

export default App
