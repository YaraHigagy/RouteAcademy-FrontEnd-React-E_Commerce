import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const [cartDetails, setCartDetails] = useState(null);
    const { numOfCartItems, setNumOfCartItems, getCartItems, updateCartItem, removeCartItem, clearCart, checkoutSession } = useContext(CartContext);
    const navigate = useNavigate();

    async function getCart() {
        let res = await getCartItems();
        setCartDetails(res.data);
    }

    async function updateQuantity(productId, count) {
        // if(count < 1) return;
        if(count < 1) {
            removeItem(productId);
        }
        let res = await updateCartItem(productId, count);
        setCartDetails(res.data);
    }
    
    async function removeItem(productId) {
        let res = await removeCartItem(productId);
    }

    async function clearCartFn() {
        let res = await clearCart();
        setCartDetails({ data: { products: [] } });
        setNumOfCartItems(0);
        navigate('/home');
    }

    async function payment() {
        navigate('/check-out');
    }

    useEffect(() => {
        getCart();
    }, []);

    return <>
        <div className="relative text-black-mut overflow-x-auto bg-gray-light shadow-md sm:rounded-lg mt-12 p-12">
            <div className='flex flex-col sm:flex-row flex-wrap sm:flex-c justify-between items-center'>
                <h2 className='capitalize mb-6'>Cart Shop</h2>
                {cartDetails?.data?.products?.length > 0 && (
                    <button onClick={payment} className='bg-primary hover:bg-primary-dark text-white text-lg rounded-lg py-2 px-4 my-3 md:my-0 transDuration-300'>Check Out</button>
                )}
            </div>
            {cartDetails?.data?.products?.length > 0 && (
                <div className='flex flex-col sm:flex-row flex-wrap sm:flex-c justify-between items-center'>
                    <p className="text-base">Total price: <span className='text-green-light'>{cartDetails?.data?.totalCartPrice}</span> EGP</p>
                    <p className="text-base">Total number of items: <span className='text-green-light'>{cartDetails?.numOfCartItems}</span></p>
                </div>
            )}
            <table className="w-full text-xl text-start rtl:text-right">
                <tbody>
                    {cartDetails?.data?.products?.length > 0 ? (
                        cartDetails?.data.products.map((product) => (
                            <tr key={product.product.id} className="border-b flex flex-wrap sm:flex-nowrap">
                                <td className="sm:w-1/2 md:w-2/6 xl:w-1/6 py-4">
                                    <img src={product.product.imageCover} className="w-full aspect-[1/1] object-contain" alt={product.title} />
                                </td>
                                <td className='sm:w-1/2 md:w-4/6 xl:w-5/6 flex flex-col sm:flex-row flex-wrap sm:flex-c justify-between items-center grow'>
                                    <div className='md:w-2/3 flex flex-col justify-center'>
                                        <div className="font-semibold">{product.product.title}</div>
                                        <div className="text-base text-accent">{product.price} EGP</div>
                                        <button onClick={() => removeItem(product.product.id)} className="text-sm text-start hover:cursor-pointer text-red-600">
                                            <i className='fa fa-trash me-1.5'></i>
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4 text-base my-3 md:my-0">
                                        <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className="flex items-center justify-center px-3 py-4 text-sm font-medium text-gray-400 border border-green-light rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Decrease Quantity</span>
                                            <i className='fa fa-minus fa-2xs'></i>
                                        </button>
                                        <div>
                                            {product.count}
                                        </div>
                                        <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className="flex items-center justify-center px-3 py-4 text-sm font-medium text-gray-400 border border-green-light rounded focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Increase Quantity</span>
                                            <i className="fa fa-plus fa-2xs"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className='font-medium text-xl'>No Items yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {cartDetails?.data?.products?.length > 0 && (
                <div className="flex items-center justify-center my-3">
                    <button onClick={clearCartFn} className='btn-outline-accent enabled-btn'>Clear Your Cart</button>
                </div>
            )}
        </div>
    </>
}

export default Cart