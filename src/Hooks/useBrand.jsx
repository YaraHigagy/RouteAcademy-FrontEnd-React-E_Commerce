import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';



function useBrand(id) {

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/Brands/${id}`);
    }

    let responseObject = useQuery({
        queryKey:['Brand', id],
        queryFn:getBrands,
        staleTime:8000,
        enabled:!!id,
        select:(data) => data.data.data,
    })

    return responseObject;
}

export default useBrand