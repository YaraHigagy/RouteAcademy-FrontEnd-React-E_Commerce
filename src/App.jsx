import React from 'react'
import {
    Home,
    Cart,
    WishList,
    Brands,
    AllOrders,
    Categories,
    Products,
    ProductDetails,
    Product,
    Register,
    Login,
    ForgetPassword,
    VerifyResetCode,
    ResetPassword,
    CheckOut,
    NotFound,
    Layout
} from './components'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import CartContextProvider from './Context/CartContext';
import WishListContextProvider from './Context/WishListContext';
import SearchProductsContextProvider from './Context/SearchProductsContext';



let query = new QueryClient({
    defaultOptions:{

    }
});

const router = createBrowserRouter([
    {path:'', element: <Layout />, children: [
        {path:'home', element: <ProtectedRoute><Home /></ProtectedRoute>},
        {path:'cart', element: <ProtectedRoute><Cart /></ProtectedRoute>},
        {path:'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute>},
        {path:'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>},
        {path:'allOrders', element: <ProtectedRoute><AllOrders /></ProtectedRoute>},
        {path:'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>},
        {path:'products', element: <ProtectedRoute><Products /></ProtectedRoute>},
        {path:'product', element: <ProtectedRoute><Product /></ProtectedRoute>},
        {path:'productDetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
        {path:'register', element: <Register />},
        {index: true, element: <Login />},
        {path:'forget-Password', element: <ForgetPassword />},
        {path:'verify-reset-code', element: <VerifyResetCode />},
        {path:'reset-password', element: <ResetPassword />},
        {path:'check-out', element: <CheckOut />},
        {path:'*', element: <NotFound />},
    ]}
]);

function App() {

    return <CartContextProvider>
        < WishListContextProvider>
            <SearchProductsContextProvider>
                <QueryClientProvider client={query}>
                    <UserContextProvider>
                        <CounterContextProvider>
                            <RouterProvider router={router}></RouterProvider>
                            <Toaster />
                            <ReactQueryDevtools />
                        </CounterContextProvider>
                    </UserContextProvider>
                </QueryClientProvider>
            </SearchProductsContextProvider>
        </WishListContextProvider>
    </CartContextProvider>
}

export default App
