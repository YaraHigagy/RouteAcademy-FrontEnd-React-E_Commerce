import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

import { Collapse } from 'flowbite';

function Navbar() {

    const $targetEl = document.getElementById('targetEl');
    const $triggerEl = document.getElementById('triggerEl');
    const options = {
        onCollapse: () => {
            // console.log('element has been collapsed');
        },
        onExpand: () => {
            // console.log('element has been expanded');
        },
        onToggle: () => {
            // console.log('element has been toggled');
        },
    };
    const instanceOptions = {
        id: 'targetEl',
        override: true
    };
    const collapse = new Collapse($targetEl, $triggerEl, options, instanceOptions);

    const {numOfCartItems} = useContext(CartContext);
    const {userLogin, setUserLogin} = useContext(UserContext);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('UserToken');
        setUserLogin(null);
        navigate('/');
    }

    useEffect(() => {
        
    }, []);

    return <>
        <nav className="bg-gray-light p-2 fixed top-0 left-0 right-0 z-40">
            <div className="container">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <Link to='home' className="flex flex-wrap items-center space-x-1 sm:space-x-3 rtl:space-x-reverse text-xl sm:text-2xl">
                        <i className='fa-solid fa-cart-shopping text-accent'></i>
                        <span className="self-center font-semibold whitespace-nowrap mb-2">Fresh Cart</span>
                    </Link>
                    <button data-collapse-toggle="targetEl" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="targetEl" id="triggerEl" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div id="targetEl" className="hidden w-full lg:flex grow lg:w-auto">
                        {userLogin !== null && <>
                            <ul className="font-medium ms-auto flex flex-col p-4 lg:p-0 mt-4 rounded-lg lg:flex-row lg:mt-0">
                                <li>
                                    <NavLink to='home' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='cart' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to='wishList' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Wish List</NavLink>
                                </li>
                                <li>
                                    <NavLink to='products' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to='categories' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to='brands' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Brands</NavLink>
                                </li>
                            </ul>
                        </>}
                        <ul className="font-medium ms-auto flex flex-col items-center p-4 lg:p-0 mt-4 rounded-lg lg:flex-row lg:mt-0">
                            {userLogin === null ? <>
                                <li>
                                    <NavLink to='register' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to='' className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2">Log in</NavLink>
                                </li>
                            
                            </> : <>
                                <li>
                                    <NavLink to='cart' className="relative inline-flex items-center  py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2 text-xl sm:text-2xl">
                                    <i className='fa-solid fa-cart-shopping'></i>
                                        <span className="sr-only">Notifications</span>
                                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent border-2 border-white rounded-lg -top-1 -end-1">{numOfCartItems}</div>
                                    </NavLink>
                                </li>
                                <li onClick={logout}>
                                    <span className="block py-2 px-3 text-gray-dark rounded hover:bg-gray-100 lg:hover:bg-transparent lg:p-2 cursor-pointer">Logout</span>
                                </li></>}
                            {/* <li>
                                <div className='space-x-3'>
                                    <i className='fab fa-facebook'></i>
                                    <i className='fab fa-github'></i>
                                    <i className='fab fa-twitter'></i>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    </>
}

export default Navbar