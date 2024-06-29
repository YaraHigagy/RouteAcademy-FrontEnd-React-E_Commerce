import React, { useContext } from 'react';
import { useEffect } from 'react';

import Style from './Register.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

function Register() {

    const {apiError, setApiError, isLoading, handleUserAuth} = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name:Yup.string().min(3, 'name minlength is 3').max(10, 'name maxlength is 10').required('name is required'),
        email:Yup.string().email('email is invalid').required('email is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,7}$/, 'password must start with uppercase').min(6, 'Minimum Length is 6 characters').max(8, 'Maximum Length is 8 characters').required('password is required'),
        rePassword:Yup.string().oneOf([Yup.ref('password')], 'password and rePassword must be the same').required('rePassword is required'),
        phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be valid Egyptian number').required('phone is required'),
    })

    const formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:''
        },
        validationSchema,
        onSubmit:(formValues) => handleUserAuth('/signup', formValues, navigate, '/home')
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
            <h2 className='text-3xl font-bold text-accent mb-6 capitalize'>Register Now</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your Name :</label>
                </div>
                {(formik.errors.name && formik.touched.name) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {formik.errors.name}
                </div>}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your Email :</label>
                </div>
                {(formik.errors.email && formik.touched.email) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {formik.errors.email}
                </div>}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your Password :</label>
                </div>
                {(formik.errors.password && formik.touched.password) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {formik.errors.password}
                </div>}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your rePassword :</label>
                </div>
                {(formik.errors.rePassword && formik.touched.rePassword) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {formik.errors.rePassword}
                </div>}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your Phone Number :</label>
                </div>
                {(formik.errors.phone && formik.touched.phone) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {formik.errors.phone}
                </div>}

                <div className='flex justify-between items-center'>
                    <button type="submit" className={`btn-outline-accent ms-auto ${formik.dirty && formik.isValid ? 'enabled-btn' : 'disabled-btn'}`} disabled={!(formik.dirty && formik.isValid)}>
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register now'}
                    </button>
                </div>
            </form>

        </div>
    </>
}

export default Register