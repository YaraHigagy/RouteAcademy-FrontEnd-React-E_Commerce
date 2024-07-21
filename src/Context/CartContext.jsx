import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

function CartContextProvider(props) {

    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [cartId, setCartId] = useState('');
    const [numOfCartItems, setNumOfCartItems] = useState(localStorage.getItem('NumOfCartItems'));
    localStorage.setItem('NumOfCartItems', numOfCartItems? numOfCartItems : 0);

    let headers = {
        token: localStorage.getItem('UserToken')
    }

    function addToCard(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then((res) => {
            setUserId(res.data.data.cartOwner);
            setCartId(res.data.data._id);
            return res;
        })
            .catch((err) => err)
    }

    function removeCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function updateCartItem(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function checkoutSession(url, shippingAddress) {
        setIsLoading(true);
        // return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress
        }, {
            headers
        })
        .then((res) => {
            setIsLoading(false);
            return res;
        })
        .catch((err) => {
            setIsLoading(false);
            setApiError(err.message || 'An error occurred');
        })
    }

    function getUserOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            headers
        }).then((res) => res.data.find(obj => obj.user._id === userId))
            .catch((err) => err)
    }

    return <CartContext.Provider value={{addToCard, getCartItems, removeCartItem, updateCartItem, clearCart, checkoutSession, getUserOrders, numOfCartItems, setNumOfCartItems}}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider