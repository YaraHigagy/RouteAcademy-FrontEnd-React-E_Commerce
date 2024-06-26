import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';



function useAuthForgetPassword() {

    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`);
    }

    let responseObject = useQuery({
        queryKey:['authentication'],
        queryFn:getRecent,
        staleTime:8000,
        select:(data) => data.data.data,
    })

    return responseObject;

}

export default useAuthForgetPassword