import { createContext, useState } from "react";
import useSearchProducts from "../Hooks/useSearchProducts.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export let SearchProductsContext = createContext();

function SearchProductsContextProvider(props) {

    const [searchParamKey, setSearchParamKey] = useState('category');
    const [searchParamValue, setSearchParamValue] = useState('');

    let headers = {
        token: localStorage.getItem('UserToken')
    }

    function getProductsFromSearch() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${searchParamKey}=${searchParamValue}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    return <SearchProductsContext.Provider value={{getProductsFromSearch, searchParamKey, setSearchParamKey, searchParamValue, setSearchParamValue}}>
        {props.children}
    </SearchProductsContext.Provider>
}

export default SearchProductsContextProvider