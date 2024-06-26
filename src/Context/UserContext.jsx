import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
// import { useNavigate } from "react-router-dom";



export let UserContext = createContext(0);

export default function UserContextProvider(props) {
    const [userLogin, setUserLogin] = useState(null);
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('UserToken') !== null) {
            setUserLogin(localStorage.getItem('UserToken'));
        }
    }, []);

    async function handleUserAuth(endPoint, formValues, navigate, navigatePath, method = 'post') {
        setIsLoading(true);
        let {data} = await axios({
                method: method,
                url: `https://ecommerce.routemisr.com/api/v1/auth${endPoint}`,
                data: formValues
            })
            .then((apiResponse) => {
                if (apiResponse && apiResponse.data) {
                    setUserLogin(apiResponse.data.token);
                    if (['/signup', '/signin', '/resetPassword'].includes(endPoint)) {
                        localStorage.setItem('UserToken', apiResponse.data.token);
                        localStorage.setItem('NumOfCartItems', 0);
                    }
                    if(['/forgotPasswords', '/verifyResetCode', '/resetPassword'].includes(endPoint) && apiResponse.data.statusMsg === 'success') {
                        toast.success(apiResponse.data.message, {
                            duration: 1500,
                        });
                    }
                    if (navigate && navigatePath) {
                        navigate(navigatePath);
                    }
                } else {
                    setApiError(response.data.message);
                }
                setIsLoading(false);
            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setApiError(apiResponse?.response?.data?.message);
            })
    }

    return <UserContext.Provider value={ {userLogin, setUserLogin, apiError, setApiError, isLoading, setIsLoading, handleUserAuth} }>
        {props.children}
    </UserContext.Provider>
}