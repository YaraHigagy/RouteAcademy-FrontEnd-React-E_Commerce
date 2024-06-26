import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './MainSlider.module.css';

function MainSlider() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        
    }, []);

    return <>
        <div className='row'>
            <div className="w-3/4">

            </div>
            <div className="w-1/4">
                
            </div>
        </div>
    </>
}

export default MainSlider