import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Layout.module.css';
import {
    Navbar,
    Footer
} from '../../components';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
    const location = useLocation();
    const noContainerPaths = ['/home'];
    const shouldApplyContainer = !noContainerPaths.includes(location.pathname);

    return <>
        <Navbar />
        <div className='py-12 my-12'>
            {shouldApplyContainer ? (
                    <div className='container'>
                        <Outlet />
                    </div>
                ) : (
                <Outlet />
            )}
        </div>
        <Footer />
    </>
}

export default Layout