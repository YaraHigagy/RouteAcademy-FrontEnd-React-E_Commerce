import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Home.module.css';
import { CounterContext } from '../../Context/CounterContext';
import RecentProducts from '../../components/RecentProducts/RecentProducts';
import CategorieSlider from '../../components/CategorieSlider/CategorieSlider';
import Search from '../../components/Search/Search';
import MainSlider from '../../components/MainSlider/MainSlider';
import HeroSection from '../../components/HeroSection/HeroSection';

function Home() {
    let {counter, setCounter} = useContext(CounterContext);

    useEffect(() => {
        
    }, []);

    return <>
        <HeroSection />
        <CategorieSlider />
        <Search />
        <RecentProducts />
    </>
}

export default Home