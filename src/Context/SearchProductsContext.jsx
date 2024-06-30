import { createContext, useState } from "react";
import useSearchProducts from "../Hooks/useSearchProducts.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export let SearchProductsContext = createContext();

function SearchProductsContextProvider(props) {

    const [searchParamKey, setSearchParamKey] = useState('category');
    const [searchParamValue, setSearchParamValue] = useState('');
    const [products, setProducts] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    let headers = {
        token: localStorage.getItem('UserToken')
    }

    function getProductsByCategory(categoryId) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in][]=${categoryId}`, {
            headers
        }).then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => err)
    }

    function getProductsByBrand(brandId) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
            headers
        }).then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => err)
    }

    return <SearchProductsContext.Provider value={{getProductsByCategory, getProductsByBrand, products, setProducts,
                                isFiltered, setIsFiltered,
                                searchParamKey, setSearchParamKey, searchParamValue, setSearchParamValue}}>
        {props.children}
    </SearchProductsContext.Provider>
}

export default SearchProductsContextProvider