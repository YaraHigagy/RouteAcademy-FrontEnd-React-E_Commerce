import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './BrandModal.module.css';
import useBrand from '../../Hooks/useBrand';
import { ClimbingBoxLoader } from 'react-spinners';
import { Modal } from 'flowbite';

function BrandModal({brandId, isModal, setIsModal}) {

    const {data, isError, error, isLoading, isFetching} = useBrand(brandId);

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

    // Hide the modal
    const handleHideModal = () => {
        setIsModal(false);
    };

    const modalClasses = `overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 bg-black/50 transDutation-300 ${
        isModal ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`;

    return <>
    {data && isModal && (
        <div id="modalEl" 
            tabIndex={-1} aria-hidden="true"
            key={data._id}
            className={modalClasses}>
            <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
                {/* Modal content */}
                <div className="relative rounded-lg bg-white shadow">
                {/* Modal header */}
                <div className="flex items-start justify-end rounded-t border-b p-4">
                    <button 
                        onClick={handleHideModal}
                        type="button" className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                        <i className='fa fa-close text-xl'></i>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Modal body */}
                <div className="flex flex-wrap p-4">
                    <div className='md:w-1/2 px-3'>
                        <h1 className='max-text-3xl text-accent font-medium capitalize'>{data.name}</h1>
                        <p className='text-black-mut'>{data.slug}</p>
                    </div>
                    <div className='md:w-1/2 px-3 m-0'>
                        <img className='w-full' src={data.image} alt={data.name} />
                    </div>
                </div>
                {/* Modal footer */}
                <div className="flex justify-end items-center space-x-2 rtl:space-x-reverse rounded-b border-t border-gray-200 p-3">
                    <button 
                        onClick={handleHideModal}
                        type="button" className="rounded-lg bg-gray-500 px-3 py-1.5 m-1 text-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        Close
                    </button>
                </div>
                </div>
            </div>
        </div>
    )}
    </>
}

export default BrandModal