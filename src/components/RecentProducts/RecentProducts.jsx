import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import Product from '../Product/Product';
import { SearchProductsContext } from '../../Context/SearchProductsContext';

function RecentProducts() {

    const {getProductsFromSearch, searchParamKey, searchParamValue} = useContext(SearchProductsContext);

    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { data, isError, error, isLoading, isFetched } = useQuery({
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

    if(isLoading) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>
    }

    if(isError) {
        return <div className='py-8 w-full flex justify-center'>
            <h3>{error}</h3>
        </div>
    }

    return <>
        <div className="container">
            <div className="row gap-y-6">
                {data.map((product) => 
                    <Product product={product} key={product.id}/>
                )}
            </div>
        </div>
    </>
}

export default RecentProducts