import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';



function useSearchProducts(key, value) {

    function getProductsFromSearch() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${key}=${value}`);
    }

    let responseObject = useQuery({
        queryKey:['recentProducts', key, value],
        queryFn:getProductsFromSearch,
        staleTime:8000,
        select:(data) => data.data.data,
    })

    return responseObject;

}

export default useSearchProducts