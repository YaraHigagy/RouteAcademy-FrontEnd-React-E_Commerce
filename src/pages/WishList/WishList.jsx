import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './WishList.module.css';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

function WishList() {

    const [wishListDetails, setWishListDetails] = useState(null);
    let { getWishListItems, removeWishListItem, wishList, setWishList } = useContext(WishListContext);
    let { addToCard } = useContext(CartContext);

    async function getWishList() {
        let res = await getWishListItems();
        setWishListDetails(res.data);
    }

    async function removeItem(productId) {
        let res = await removeWishListItem(productId);
        setWishListDetails(res.data);
        console.log(res)
    }

    async function addProductToCard(productId) {
        let res = await addToCard(productId);
        await removeItem(productId);
        if(res.data.status === 'success') {
            toast.success('Product added successfully to your cart.', {
                duration: 1500,
            });
        }
        else {
            toast.error('Error adding product to your cart.', {
                duration: 1500,
            });
        }
    }

    useEffect(() => {
        getWishList();
        // console.log(wishListDetails);
    }, [wishListDetails]);

    return <> 
        <div className="relative overflow-x-auto bg-gray-light shadow-md sm:rounded-lg mt-12 p-6">
            <h2 className='capitalize mb-6'>My Wish List</h2>
            <table className="w-full text-xl text-start rtl:text-right text-black-mut">
                <tbody>
                {wishListDetails?.data?.length > 0 ? (
                    wishListDetails?.data?.map((product) => 
                    <tr key={product.id} className="border-b flex flex-wrap sm:flex-nowrap">
                        <td className="sm:w-1/2 md:w-2/6 xl:w-1/6 py-4">
                            <img src={product.imageCover} className="w-full aspect-[1/1] object-contain" alt={product.title} />
                        </td>
                        <td className='sm:w-1/2 md:w-4/6 xl:w-5/6 flex flex-col sm:flex-row flex-wrap sm:flex-c justify-between items-center grow'>
                            <div className='md:w-2/3 flex flex-col justify-center'>
                                <div className="font-semibold">{product.title}</div>
                                <div className="text-base text-accent">{product.price} EGP</div>
                                <button onClick={() => removeItem(product.id)} className="text-sm text-start hover:cursor-pointer text-red-600">
                                    <i className='fa fa-trash me-1.5'></i>
                                    <span>Remove</span>
                                </button>
                            </div>
                            <div className='md:w-1/3'>
                                <div>
                                    <button onClick={() => addProductToCard(product.id)} className='border border-accent rounded-lg py-2 px-4 my-3 md:my-0 hover:bg-accent hover:text-white transDuration-300'>
                                        <span>Add To Card</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    )) : (
                        <tr>
                            <td colSpan="2" className='font-medium text-xl'>No Items yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>
}

export default WishList