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
import useProducts from '../../Hooks/useProducts';

function RecentProducts() {

    const {products, isFiltered} = useContext(SearchProductsContext);
    const {data, isError, error, isLoading, isFetching} = useProducts();

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

    // if (isFiltered && !products.length) {
    //     return (
    //         <div className='py-8 w-full flex justify-center'>
    //             <ClimbingBoxLoader color='green' />
    //         </div>
    //     );
    // }

    return <>
        <div className="container">
            <div className="row gap-y-6">
                {isFiltered && products && products.map((product) => 
                    <Product product={product} key={product.id}/>
                )}
                {isFiltered && !products.length && 
                    (<p className='font-medium text-xl'>No Items yet.</p>)
                }
                {!isFiltered && data && data.map((product) => 
                    <Product product={product} key={product.id}/>
                )}
            </div>
        </div>
    </>
}

export default RecentProducts