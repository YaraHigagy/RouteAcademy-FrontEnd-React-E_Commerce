import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './SubCategories.module.css';
import useSubCategories from '../../Hooks/useSubCategories';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

function SubCategories({categoryId, categoryName}) {

    const {data, isError, error, isLoading, isFetching} = useSubCategories(categoryId);

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
        <h2 className='max-text-3xl text-accent text-center capitalize'>{categoryName} SubCategories</h2>
        <div className="row gap-y-6 justify-center md:justify-start">
            {data.map((subCategory) => (
                <div className="md:w-1/3 px-3" key={subCategory._id}>
                    <div className="subCategory border border-gray-300 rounded-md hover:shadow-3xl transDuration-300">
                        <div className='text-center text-xl lg:text-2xl p-4'>
                            <p className='font-medium text-black-mut leading-tighter mb-2'>{subCategory.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
}

export default SubCategories