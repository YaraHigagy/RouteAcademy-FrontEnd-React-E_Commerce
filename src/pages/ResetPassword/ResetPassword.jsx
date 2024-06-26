import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './ResetPassword.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

function ResetPassword() {

    const {apiError, setApiError, isLoading, handleUserAuth} = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email:Yup.string().email('email is invalid').required('email is required'),
        newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,7}$/, 'password must start with uppercase').min(6, 'Minimum Length is 6 characters').max(8, 'Maximum Length is 8 characters').required('password is required'),
    })

    const formik = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        validationSchema,
        onSubmit:(formValues) => handleUserAuth('/resetPassword', formValues, navigate, '/home', 'put')
    })

    useEffect(() => {
        // Cleanup any previous error messages when the component mounts or updates
        setApiError('');
    }, [formik.values.email, formik.values.password]);

    return <>
        <div className='py-6 mx-auto'>
            {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apiError}
            </div>}
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-6 capitalize'>reset your account password</h2>
            <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
                </div>
                {(formik.errors.email && formik.touched.email) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.email}
                </div>}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password :</label>
                </div>
                {(formik.errors.newPassword && formik.touched.newPassword) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.newPassword}
                </div>}
                <div className='flex justify-between items-center'>
                    <button type="submit" className={`btn-outline-accent ${formik.dirty && formik.isValid ? 'enabled-btn' : 'disabled-btn'}`} disabled={!(formik.dirty && formik.isValid)}>
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Reset Password'}
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default ResetPassword