import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from "react-slick";

import Style from './CategorieSlider.module.css';
import axios from 'axios';
import useCategories from '../../Hooks/useCategories';
import { ClimbingBoxLoader } from 'react-spinners';

function CategorieSlider() {

    // Slick Slides
    const sliderRef = useRef(null);
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Get All Categories
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
        <div className='py-5'>
            <Slider ref={sliderRef} {...settings} className='mb-10'>
                {data?.map((category) => 
                    <div key={category._id}>
                        <img className='w-full aspect-[1/1.18] object-cover object-center' src={category.image} alt={category.name} />
                        <h3 className='text-xl text-black-mut text-medium capitalize'>{category.name}</h3>
                    </div>
                )}
            </Slider>
            <div className='flex justify-center items-center gap-4'>
                <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={previous}></button>
                <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={next}></button>
            </div>
        </div>
    </>
}

export default CategorieSlider