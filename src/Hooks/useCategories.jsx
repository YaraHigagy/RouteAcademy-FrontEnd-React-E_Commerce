import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';



function useCategories() {

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }

    let responseObject = useQuery({
        queryKey:['categories'],
        queryFn:getCategories,
        staleTime:8000,
        select:(data) => data.data.data,
    })

    return responseObject;

}

export default useCategories