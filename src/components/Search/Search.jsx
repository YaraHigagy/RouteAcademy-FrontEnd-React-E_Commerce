import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Search.module.css';
import { SearchProductsContext } from '../../Context/SearchProductsContext';
import useSearchProducts from '../../Hooks/useSearchProducts.jsx';
import { ClimbingBoxLoader } from 'react-spinners';
import useProducts from '../../Hooks/useProducts.jsx';
import { useQuery } from '@tanstack/react-query';
import useCategories from '../../Hooks/useCategories.jsx';
import { NavLink } from 'react-router-dom';
import useBrands from '../../Hooks/useBrands.jsx';

function Search() {

    const inputRef = useRef(null);
    const [isCategories, setIsCategories] = useState(false);
    const [isBrands, setIsBrands] = useState(false);
    const {getProductsByCategory, getProductsByBrand, setSearchParamKey, setSearchParamValue, setIsFiltered} = useContext(SearchProductsContext);
    const {data: categories, isLoading: isLoadingCategories, isError: isErrorCategories, error: errorCategories} = useCategories();
    const {data: brands, isLoading: isLoadingBrands, isError: isErrorBrands, error: errorBrands} = useBrands();

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleSearchKey(key) {
        setSearchParamKey(key);
    }

    function handleSearchValue(val) {
        setSearchParamValue(val);
        inputRef.current.value = val;
    }

    function handleCategories() {
        setIsCategories(!isCategories);
        if(!isCategories) {
            setIsFiltered(false);
        }
    }

    function handleBrands() {
        setIsBrands(!isBrands);
        if(!isBrands) {
            setIsFiltered(false);
        }
    }

    function handleFilterByCategory(categoryId) {
        getProductsByCategory(categoryId);
        setIsFiltered(true);
    }

    function handleFilterByBrand(brandId) {
        getProductsByBrand(brandId);
        setIsFiltered(true);
    }

    return <>
    <div className="container my-12">
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <div className="relative w-full">
                    <input  ref={inputRef} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-2 border border-gray-300 focus:ring-lime-500 focus:border-lime-500" 
                        placeholder="Search Categories, Brands, Price ..." 
                        onInput={(e) => handleSearchValue(e.target.value)}
                        />
                    <button onClick={() => handleSearchValue(inputRef.current.value)} type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-accent rounded-e-lg border border-accent hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-lime-300">
                        <i className='fa fa-search fa-lg px-2'></i>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
        <nav className='flex flex-wrap justify-center items-baseline gap-6 my-4'>
            <p className='font-semibold mb-0'>Search by:</p>
            {/* <NavLink
            > */}
                <button 
                className={`filterTab border-b-2 border-gray-400 pb-2 ${isCategories ? 'active' : ''}`}
                    onClick={() => {
                        handleSearchKey('category');
                        handleCategories();
                    }}
                    >Categories
                    </button>
            {/* </NavLink>
            <NavLink
            > */}
                    <button 
                className={`filterTab border-b-2 border-gray-400 pb-2 ${isBrands ? 'active' : ''}`}
                    onClick={() => {
                        handleSearchKey('brand');
                        handleBrands();
                    }}
                    >Brands
                    </button>
            {/* </NavLink> */}
        </nav>
        {isCategories && (
            <div className='flex flex-wrap justify-center items-baseline gap-3 my-4'>
                {isLoadingCategories ? (
                        <div className='py-8 w-full flex justify-center'>
                            <ClimbingBoxLoader color='green' />
                        </div>
                    ) : isErrorCategories ? (
                        <div className='py-8 w-full flex justify-center'>
                            <h3>{errorCategories.message}</h3>
                        </div>
                    ) : (
                    categories?.map((category) => 
                        <div key={category._id} 
                            // onClick={() => handleSearchValue(category.name)}
                            onClick={() => handleFilterByCategory(category._id)}
                            className='text-gray-500 bg-blue-100 rounded-md px-5 py-2 hover:text-black-mut hover:bg-blue-200 cursor-pointer transDuration-300'>
                            <span>{category.name}</span>
                        </div>
                    )
                )}
            </div>
        )}
        {isBrands &&  (
            <div className='flex flex-wrap justify-center items-baseline gap-3 my-4'>
                {isLoadingBrands ? (
                        <div className='py-8 w-full flex justify-center'>
                            <ClimbingBoxLoader color='green' />
                        </div>
                    ) : isErrorBrands ? (
                        <div className='py-8 w-full flex justify-center'>
                            <h3>{errorBrands.message}</h3>
                        </div>
                    ) : (
                    brands?.map((brand) => 
                        <div key={brand._id} 
                        // onClick={() => handleSearchValue(brand.name)}
                        onClick={() => handleFilterByBrand(brand._id)}
                        className='text-gray-500 bg-blue-100 rounded-md px-5 py-2 hover:text-black-mut hover:bg-blue-200 cursor-pointer transDuration-300'>
                            <span>{category.name}</span>
                        </div>
                    )
                )}
            </div>
        )}
    </div>
    </>
}

export default Search