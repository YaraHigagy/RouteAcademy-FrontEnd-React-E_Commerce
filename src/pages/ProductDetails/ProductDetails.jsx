import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";

import Style from './ProductDetails.module.css';
import { Product } from '../../components';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';

function ProductDetails() {

    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    let {id, category} = useParams();

    // Slick Slides
    const sliderRef = useRef(null);
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({data}) => {
                setProductDetails(data.data);
            })
            .catch((err) => {

            })
    }

    function getRelatedProducts(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({data}) => {
                let allProducts = data.data;
                let relatedProducts = allProducts.filter((product) => product.category.name == category);
                setRelatedProducts(relatedProducts);
            })
            .catch(() => {

            })
    }

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

    useEffect(() => {
        getProductDetails(id);
        getRelatedProducts(category);
    }, [id, category]);

    return <>
        <div className="row text-black-mut">
            <div className="w-full md:w-1/4">
                <Slider ref={sliderRef} {...settings}>
                    {productDetails?.images?.map((src) => <img key={src} className='w-full' src={src} alt={productDetails?.title} />)}
                </Slider>
                <div className='flex justify-center items-center gap-4 mt-4'>
                    <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={previous}></button>
                    <button className="w-4 h-2 bg-slate-300 rounded hover:bg-slate-400" onClick={next}></button>
                </div>
            </div>
            <div className="w-full md:w-3/4 p-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl leading-tighter">{productDetails?.title}</h2>
                <p>{productDetails?.description}</p>
                <div className='flex mt-4 justify-between items-center'>
                    <span>{productDetails?.price} EGP</span>
                    <span><i className='fas fa-star text-yellow-400'></i> {productDetails?.ratingsAverage}</span>
                </div>
                <div className='flex justify-between items-center px-3 mt-3'>
                    <button onClick={() => addProductToCard(productDetails?.id)} className='btn mx-auto'>Add To Card</button>
                    <button onClick={() => toggleWishList(productDetails?.id)} className={isWishListed ? 'text-black-mut' : 'text-red-500'}>
                        <i className='fa-solid fa-heart text-2xl'></i>
                    </button>
                </div>
            </div>
        </div>

        <div className="row">
            {relatedProducts.map((product) =>
                <Product product={product} key={product.id}/>
            )}
        </div>
    </>
}

export default ProductDetails