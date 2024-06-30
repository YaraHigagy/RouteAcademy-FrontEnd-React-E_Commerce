import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Products.module.css';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useProducts from '../../Hooks/useProducts';
import { Product, Search } from '../../components';
import { SearchProductsContext } from '../../Context/SearchProductsContext';

function Products() {

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

    return <>
        <div className="row gap-y-6">
            <Search />
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
    </>
}

export default Products