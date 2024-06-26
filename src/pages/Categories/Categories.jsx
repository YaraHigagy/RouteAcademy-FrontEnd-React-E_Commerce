import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Categories.module.css';
import useCategories from '../../Hooks/useCategories';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import SubCategories from '../../components/SubCategories/SubCategories';

function Categories() {

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const handleCategoryClick = (category) => {
        setSelectedCategoryId(category._id);
        setSelectedCategoryName(category.name);
    };
    

    const {data, isError, error, isLoading, isFetching} = useCategories();

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
        <div className="row gap-y-6 justify-center md:justify-start">
            {data.map((category) => 
                <div className="md:w-1/3 px-3" key={category._id}>
                    <div className="category border border-gray-300 rounded-md overflow-hidden hover:shadow-3xl transDuration-300 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}>
                        <img className='w-full md:h-75 md:aspect-[3/4] object-center object-cover' src={category.image} alt={category.name} />
                        <div className='text-center text-xl lg:text-2xl p-4'>
                            <p className='font-medium text-success leading-tighter mb-2'>{category.name}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        {selectedCategoryId && (
            <SubCategories categoryId={selectedCategoryId} categoryName={selectedCategoryName}/>
        )}
    </>
}

export default Categories