import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



export let UserContext = createContext(0);

export default function UserContextProvider(props) {
    const [userLogin, setUserLogin] = useState(null);
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('UserToken') !== null) {
            setUserLogin(localStorage.getItem('UserToken'));
        }
    }, []);

    function handleUserAuth(endPoint, formValues, navigate, navigatePath, method = 'post') {
        setIsLoading(true);
        axios({
                method: method,
                url: `https://ecommerce.routemisr.com/api/v1/auth${endPoint}`,
                data: formValues
            })
            .then((apiResponse) => {
                if (apiResponse && apiResponse.data) {
                    if (['/signup', '/signin', '/resetPassword'].includes(endPoint)) {
                        setUserLogin(apiResponse.data.token);
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
                    setApiError(apiResponse?.response?.data?.message || 'Unexpected error');
                }
                setIsLoading(false);
            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setApiError(apiResponse?.response?.data?.message || 'An error occurred');
            })
    }

    return <UserContext.Provider value={ {userLogin, setUserLogin, apiError, setApiError, isLoading, setIsLoading,
                                        handleUserAuth} }>
        {props.children}
    </UserContext.Provider>
}