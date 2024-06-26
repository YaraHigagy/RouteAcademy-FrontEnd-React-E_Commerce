import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';



function useBrands() {

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/Brands`);
    }

    let responseObject = useQuery({
        queryKey:['Brands'],
        queryFn:getBrands,
        staleTime:8000,
        select:(data) => data.data.data,
    })

    return responseObject;
}

export default useBrands