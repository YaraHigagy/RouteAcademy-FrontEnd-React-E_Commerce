import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Product.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';

function Product({product}) {

    let { addToCard, setNumOfCartItems } = useContext(CartContext);
    let { addToWishList, getWishListItems, removeWishListItem, wishList, setWishList } = useContext(WishListContext);
    const [isWishListed, setIsWishListed] = useState(true);

    async function addProductToCard(productId) {
        let res = await addToCard(productId);    
        if(res.data.status === 'success') {
            toast.success('Product added successfully to your cart.', {
                duration: 1500,
            });
            setNumOfCartItems(res.data.numOfCartItems);
        }
        else {
            toast.error('Error adding product to your cart.', {
                duration: 1500,
            });
        }
    }

    async function toggleWishList(productId) {
        setIsWishListed(!isWishListed);
        if(isWishListed === true) {
            let res = await addToWishList(productId);
            if(res.data.status === 'success') {
                toast.success('Product added successfully to your wishList.', {
                    duration: 1500,
                });
            }
            else {
                toast.error('Error adding product to your wishList.', {
                    duration: 1500,
                });
            }
        }
        else {
            let res = await removeWishListItem(productId);
            if(res.data.status === 'success') {
                toast.success('Product removed successfully from your wishList.', {
                    duration: 1500,
                });
            }
            else {
                toast.error('Error removing product from your wishList.', {
                    duration: 1500,
                });
            }
        }
    }

    return <>
        <div className="md:w-1/2 lg:w-1/4 px-3" key={product.id}>
            <div className="product group px-2 py-4 rounded-md hover:shadow-3xl transDuration-300">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                    <img className='w-full aspect-[1/1] object-contain' src={product.imageCover} alt={product.title} />
                    <span className='block font-light text-accent mb-4'>{product.category.name}</span>
                    <h3 className='text-base font-normal text-black-mut capitalize mb-2'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                    <div className='flex justify-between items-center'>
                        <span>{product.price} EGP</span>
                        <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                    </div>
                </Link>
                <div className='flex justify-between items-center px-3 mt-3'>
                    <button onClick={() => addProductToCard(product.id)} className='btn btn-translate'>+ Add</button>
                    <button onClick={() => toggleWishList(product.id)} className={isWishListed ? 'text-black-mut' : 'text-red-500'}>
                        <i className='fa-solid fa-heart text-2xl'></i>
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default Product