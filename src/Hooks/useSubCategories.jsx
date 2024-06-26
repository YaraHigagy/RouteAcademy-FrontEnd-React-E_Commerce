import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';



function useSubCategories(id) {

    function getSubCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    }

    let responseObject = useQuery({
        queryKey:['subcategories', id],
        queryFn:getSubCategories,
        staleTime:8000,
        enabled:!!id,
        select:(data) => data.data.data,
    })

    return responseObject;
}

export default useSubCategories