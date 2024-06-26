import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Products.module.css';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useProducts from '../../Hooks/useProducts';
import { Product } from '../../components';

function Products() {

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

            {data.map((product) => 
                <Product product={product} key={product.id}/>
            )}

        </div>
    </>
}

export default Products