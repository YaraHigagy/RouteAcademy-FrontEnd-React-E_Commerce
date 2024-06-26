import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

function WishListContextProvider(props) {

    const [wishList, setWishList] = useState([]);

    let headers = {
        token: localStorage.getItem('UserToken')
    }

    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishList`, {
            productId
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function getWishListItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishList`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function removeWishListItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishList/${productId}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    return <WishListContext.Provider value={{addToWishList, getWishListItems, removeWishListItem, wishList, setWishList}}>
        {props.children}
    </WishListContext.Provider>
}

export default WishListContextProvider