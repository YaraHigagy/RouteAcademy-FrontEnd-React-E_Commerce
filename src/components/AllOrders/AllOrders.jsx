import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './AllOrders.module.css';

function AllOrders() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        
    }, []);

    return <>
        <h2>AllOrders</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem distinctio dicta tenetur impedit aspernatur!</p>
    </>
}

export default AllOrders