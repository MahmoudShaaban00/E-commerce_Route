import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      getLoggedUserCart();
    }
  }, []);

  function showError(msg, error) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.msg ||
      error?.message ||
      'Something went wrong';
    toast.error(`${msg}: ${errorMsg}`);
  }

  function getHeaders() {
    return {
      token: localStorage.getItem('userToken'),
    };
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() })
      .then((res) => {
        setNumOfCartItems(res?.data?.numOfCartItems || 0);
        return res;
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          toast.info('Cart is empty.');
          setNumOfCartItems(0);
          return { data: { status: 'empty', numOfCartItems: 0, data: [] } };
        }
        showError('Failed to fetch cart', err);
        return err;
      });
  }

  function addProductToCart(productId) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers: getHeaders() })
      .then((res) => {
        toast.success('Product added to cart');
        getLoggedUserCart();
        return res;
      })
      .catch((err) => {
        showError('Failed to add product', err);
        return err;
      });
  }

  function deleteProductItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: getHeaders() })
      .then((res) => {
        toast.success('Product removed from cart');
        getLoggedUserCart();
        return res;
      })
      .catch((err) => {
        showError('Failed to remove product', err);
        return err;
      });
  }

  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: getHeaders() }
      )
      .then((res) => {
        toast.success('Quantity updated');
        getLoggedUserCart();
        return res;
      })
      .catch((err) => {
        showError('Failed to update quantity', err);
        return err;
      });
  }

  function deleteAll() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() })
      .then((res) => {
        toast.success('Cart cleared');
        setNumOfCartItems(0);
        return res;
      })
      .catch((err) => {
        showError('Failed to clear cart', err);
        return err;
      });
  }

  function createCashOrder(cartId, address) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: address },
        { headers: getHeaders() }
      )
      .then((res) => {
        toast.success('Cash order created successfully!');
        getLoggedUserCart();
        return res;
      })
      .catch((err) => {
        showError('Failed to create cash order', err);
        return err;
      });
  }

  return (
    <CartContext.Provider
      value={{
        deleteProductItem,
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteAll,
        createCashOrder,
        numOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
