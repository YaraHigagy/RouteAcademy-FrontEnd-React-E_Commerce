import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { SearchProductsContext } from '../Context/SearchProductsContext';



function useProducts() {

    const {searchParamKey, searchParamValue} = useContext(SearchProductsContext);

    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let responseObject = useQuery({
        queryKey:['recentProducts'],
        queryFn:getRecent,
        gcTime:1000,
        select: (data) => {
            const products = data.data.data;
            if (data && data.data && data.data.data) {
                if (searchParamKey && searchParamValue) {
                    switch (searchParamKey) {
                        case 'category':
                            return products.filter(prd => prd.category.name.toLowerCase().includes(searchParamValue.toLowerCase()));
                        case 'brand':
                            return products.filter(prd => prd.brand.name.toLowerCase().includes(searchParamValue.toLowerCase()));
                        default:
                            return products.filter(prd => 
                                prd.brand.name.toLowerCase().includes(searchParamValue.toLowerCase()) ||
                                prd.category.name.toLowerCase().includes(searchParamValue.toLowerCase()) ||
                                prd.title.toLowerCase().includes(searchParamValue.toLowerCase())
                            );
                    }
                }
                return products;
            } else {
                return products;
            }
        },
    })

    return responseObject;

}

export default useProducts