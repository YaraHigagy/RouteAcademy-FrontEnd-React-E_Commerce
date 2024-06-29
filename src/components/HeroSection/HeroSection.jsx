import React, { useRef } from 'react';
import { useEffect } from 'react';

import Style from './HeroSection.module.css';
import Slider from 'react-slick';
import img1 from '../../assets/imgs/img1.jpg'
import img2 from '../../assets/imgs/img2.jpg'
import img3 from '../../assets/imgs/img3.jpg'
import img4 from '../../assets/imgs/img4.jpg'
import img5 from '../../assets/imgs/img5.jpg'

function HeroSection() {

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
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    useEffect(() => {
        
    }, []);

    return <>
        <div className='container'>
            <div className='row justify-center items-center w-full lg:w-1/2 mx-auto'>
                <div className='w-full md:w-1/2 flex flex-col'>
                    <Slider ref={sliderRef} {...settings} className='mb-10'>
                            <img className='w-full object-cover object-center' src={img3} alt='' />
                            <img className='w-full object-cover object-center' src={img4} alt='' />
                            <img className='w-full object-cover object-center' src={img5} alt='' />
                    </Slider>
                    <div className='flex justify-center items-center gap-4'>
                        <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={previous}></button>
                        <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={next}></button>
                    </div>
                </div>
                <div className='w-full md:w-1/2 flex flex-col mt-6 md:mt-0'>
                    <img className='w-full object-cover object-center' src={img1} alt='' />
                    <img className='w-full object-cover object-center' src={img2} alt='' />
                </div>
            </div>
        </div>
    </>
}

export default HeroSection