import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';



function useProducts() {

    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let responseObject = useQuery({
        queryKey:['recentProducts'],
        queryFn:getRecent,
        staleTime:8000,
        select:(data) => data.data.data,
    })

    return responseObject;

}

export default useProducts