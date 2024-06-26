import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

function CartContextProvider(props) {

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
        .then((response) => response)
        .catch((err) => err)
    }

    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then((res) => res)
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
        .then((response) => response)
        .catch((err) => err)
    }

    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function checkoutSession() {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/665b3897c20c3e034450c7a3?url=http://localhost:5173`, {
            "shippingAddress":{
                "details": "details",
                "phone": "01010700999",
                "city": "Cairo"
                }
        }, {
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }

    return <CartContext.Provider value={{addToCard, getCartItems, removeCartItem, updateCartItem, clearCart, checkoutSession, numOfCartItems, setNumOfCartItems}}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider