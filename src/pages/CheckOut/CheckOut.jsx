import React, { useContext, useState } from 'react';
import { useEffect } from 'react';

import Style from './CheckOut.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import { AllOrders } from '../../components';

function CheckOut() {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const { checkoutSession, apiError, setApiError, isLoading, getUserOrders } = useContext(CartContext);
    // let navigate = useNavigate();
    
    let validationSchema = Yup.object().shape({
        details: Yup.string().max(500, 'Address must be at most 500 characters').required('Address is required'),
        phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone must be valid Egyptian number').required('Phone is required'),
        city:Yup.string().matches(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,}$/, 'City name is not valid').max(100, 'City name must be at most 500 characters').required('City name is required'),
    })
    
    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
        validationSchema,
        onSubmit:() => {
            handleCheckOut('http://localhost:5173');
            setIsOpenModal(true);
        }
    })

    async function handleCheckOut(url) {
        let {data} = await checkoutSession(url, formik.values);
        if(data.status == 'success') {
            // window.open(data.session.url);
            window.location.href = data.session.url;
        }
    }

    useEffect(() => {
        // setApiError('');
    }, [formik.values.details, formik.values.phone, formik.values.city]);

    return <>
        <div className='py-6 mx-auto'>
            {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apiError}
            </div>}
            <h2 className='text-3xl font-bold text-accent mb-6 capitalize'>Login Now</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Details :</label>
                </div>
                {(formik.errors.details && formik.touched.details) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.details}
                </div>}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Phone :</label>
                </div>
                {(formik.errors.phone && formik.touched.phone) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.phone}
                </div>}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">City :</label>
                </div>
                {(formik.errors.city && formik.touched.city) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.city}
                </div>}

                <div className='flex justify-between items-center'>
                    <button type="submit" className={`btn-outline-accent ${formik.dirty && formik.isValid ? 'enabled-btn' : 'disabled-btn'}`} disabled={!(formik.dirty && formik.isValid)}>
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Pay now'}
                    </button>
                </div>
            </form>
        </div>

        {isOpenModal && (
            <AllOrders isModal={isOpenModal} setIsModal={setIsOpenModal}/>
        )}
    </>
}

export default CheckOut