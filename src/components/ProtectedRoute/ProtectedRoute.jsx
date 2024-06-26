import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {

    if(localStorage.getItem('UserToken') !== null) {
        return props.children;
    } else {
        return <Navigate to={'/'} />
    }
}

export default ProtectedRoute