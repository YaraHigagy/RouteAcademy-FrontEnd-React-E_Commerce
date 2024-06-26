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

function Search() {

    const inputRef = useRef(null);
    const [productsList, setProductsList] = useState([]);
    const {getProductsFromSearch, searchParamKey, setSearchParamKey, searchParamValue, setSearchParamValue} = useContext(SearchProductsContext);
    // const categories = useCategories();

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleSearchKey(key) {
        setSearchParamKey(key);
    }

    function handleSearchValue(value) {
        setSearchParamValue(value);
    }

    return <>
    <form className="container my-12"
        onSubmit={(e) => handleSubmit(e)}
    >
        <div className="flex">
            <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-black-mut sr-only">Your Email</label>
            <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-baseline py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100" type="button">
                Search By: 
                <i className='fa fa-angle-down ms-2'></i>
            </button>
            <div id="dropdown"className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                    <li>
                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-lime-50"
                            onClick={(e) => handleSearchKey(e.target.value)}
                            value={'category'}
                        >Categories</button>
                    </li>
                    <li>
                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-lime-50"
                            onClick={(e) => handleSearchKey(e.target.value)}
                            value={'brand'}
                        >Brands</button>
                    </li>
                </ul>
            </div>
            <div className="relative w-full">
                <input  ref={inputRef} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-lime-500 focus:border-lime-500" 
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
    </>
}

export default Search