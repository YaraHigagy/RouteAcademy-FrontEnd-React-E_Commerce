import React, { useContext } from 'react';
import { useEffect } from 'react';

import Style from './VerifyResetCode.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

function VerifyResetCode() {

    const {apiError, setApiError, isLoading, handleUserAuth} = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        resetCode:Yup.string().matches(/^\d{5,6}$/, 'The code should be a 6-digit number').required('code is required'),
    })

    const formik = useFormik({
        initialValues:{
            resetCode:'',
        },
        validationSchema,
        onSubmit:(formValues) => handleUserAuth('/verifyResetCode', formValues, navigate, '/reset-password')
    })

    useEffect(() => {
        setApiError('');
    }, [formik.values.resetCode]);

    return <>
        <div className='py-6 mx-auto'>
            {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apiError}
            </div>}
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-6 capitalize'>reset your account password</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} maxLength='6' type="resetCode" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer" placeholder=" " />
                    <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Code</label>
                </div>
                {(formik.errors.resetCode && formik.touched.resetCode) && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.resetCode}
                </div>}

                <div className='flex justify-between items-center'>
                    <button type="submit" className={`btn-outline-accent ${formik.dirty && formik.isValid ? 'enabled-btn' : 'disabled-btn'}`} disabled={!(formik.dirty && formik.isValid)}>
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Verify'}
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default VerifyResetCode