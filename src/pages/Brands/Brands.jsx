import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Brands.module.css';
import useBrands from '../../Hooks/useBrands';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite';
import useBrand from '../../Hooks/useBrand';
import BrandModal from '../../components/BrandModal/BrandModal';

function Brands() {

    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(true);

    const {data, isError, error, isLoading, isFetching} = useBrands();

    if(isLoading) {
        return <div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>
    }

    if(isError) {
        return <div className='py-8 w-full flex justify-center'>
            <h3>{error}</h3>
        </div>
    }

    const handleModal = (brand) => {
        setSelectedBrandId(brand._id);
        setIsOpenModal(true);
    }

    return <>
        <h2 className='max-text-4xl text-accent text-center capitalize mt-9 mb-4 leading-tighter'>All Brands</h2>
        <div className="row gap-y-6 justify-center md:justify-start">
            {data?.map((brand) => 
                <div className="md:w-1/3 lg:w-1/4 px-3" key={brand._id}>
                    <div className="brand border border-gray-300 rounded-md overflow-hidden hover:shadow-3xl transDuration-300 cursor-pointer"
                        data-modal-target="modalEl" data-modal-toggle="modalEl"
                        onClick={() => handleModal(brand)}
                    >
                        <img className='w-full' src={brand.image} alt={brand.name} />
                        <div className='text-center p-4'>
                            <p className='mb-4'>{brand.name}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {selectedBrandId && (
            <BrandModal brandId={selectedBrandId} isModal={isOpenModal} setIsModal={setIsOpenModal}/>
        )}
    </>
}

export default Brands




























// import React, { useRef } from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';

// import Style from './Brands.module.css';
// import useBrands from '../../Hooks/useBrands';
// import { ClimbingBoxLoader } from 'react-spinners';
// import { Link } from 'react-router-dom';
// import { Modal } from 'flowbite';
// import useBrand from '../../Hooks/useBrand';

// function Brands() {

//     const [selectedBrand, setSelectedBrand] = useState(null);
//     const [selectedBrandId, setSelectedBrandId] = useState('');
//     // const [isModalOpen, setIsModalOpen] = useState(false);

//       // Ref for the modal element
//     const modalElRef = useRef(null);

//     const {data, isError, error, isLoading, isFetching} = useBrands();

//     // // Initialize modal instance after data fetching (assuming data is required for the modal)
//     // useEffect(() => {
//     //     if (data) {
//     //         const modalInstance = new Modal(modalElRef.current, options, instanceOptions);
//     //         if(isModalOpen) {
//     //             modalInstance.show();
//     //         } else {
//     //             modalInstance.hide();
//     //         }
//     //         // Attach event listeners for show/hide if needed (optional)
//     //     }
//     // }, [data]);

//     if(isLoading) {
//         return <div className='py-8 w-full flex justify-center'>
//             <ClimbingBoxLoader color='green' />
//         </div>
//     }

//     if(isError) {
//         return <div className='py-8 w-full flex justify-center'>
//             <h3>{error}</h3>
//         </div>
//     }

//     const handleOpenModal = (brand) => {
//         setSelectedBrandId(brand._id);
//         console.log(selectedBrandId);
//         const brandData = useBrand(selectedBrandId);
//         setSelectedBrand(brandData);
//         // setIsModalOpen(true);
//         modal.show();
//         console.log(selectedBrand);
//     };
//     const handleCloseModal = () => {
//         // setIsModalOpen(false);
//         modal.hide();
//     };

//     // set the modal menu element
//     // const $targetEl = document.getElementById('modalEl');
//     const $targetEl = modalElRef.current;

//     // options with default values
//     const options = {
//         placement: 'bottom-right',
//         backdrop: 'dynamic',
//         backdropClasses:
//             'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
//         closable: true,
//         onHide: () => {
//             console.log('modal is hidden');
//         },
//         onShow: () => {
//             console.log('modal is shown');
//         },
//         onToggle: () => {
//             console.log('modal has been toggled');
//         },
//     };

//     // instance options object
//     const instanceOptions = {
//         id: 'modalEl',
//         override: true
//     };

//     let modal = new Modal($targetEl, options, instanceOptions);



//     return <>
//         <h2 className='max-text-4xl text-accent text-center capitalize mt-9 mb-4 leading-tighter'>All Brands</h2>
//         <div className="row gap-y-6 justify-center md:justify-start">
//             {data?.map((brand) => 
//                 <div className="md:w-1/3 lg:w-1/4 px-3" key={brand._id}>
//                     <div className="brand border border-gray-300 rounded-md overflow-hidden hover:shadow-3xl transDuration-300 cursor-pointer"
//                         data-modal-target="modalEl" data-modal-toggle="modalEl"
//                         // onClick={() => {
//                         //     setSelectedBrand(brand);
//                         //     modal.show();
//                         // }}
//                         onClick={() => handleOpenModal(brand)}
//                     >
//                         <img className='w-full' src={brand.image} alt={brand.name} />
//                         <div className='text-center p-4'>
//                             <p className='mb-4'>{brand.name}</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>

//         {selectedBrand && (
//         <div id="modalEl" tabIndex={-1} aria-hidden="true" ref={modalElRef}
//             key={selectedBrand._id}
//             className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
//             <div className="relative max-h-full w-full max-w-2xl">
//                 {/* Modal content */}
//                 <div className="relative rounded-lg bg-white shadow">
//                 {/* Modal header */}
//                 <div className="flex items-start justify-end rounded-t border-b p-5">
//                     <button 
//                         // onClick={() => modal.hide()}
//                         onClick={handleCloseModal}
//                         type="button" className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
//                         <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//                         </svg>
//                         <span className="sr-only">Close modal</span>
//                     </button>
//                 </div>
//                 {/* Modal body */}
//                 <div className="flex flex-wrap space-y-6 p-6">
//                     <div className='md:w-1/2'>
//                         <h1 className='max-text-3xl text-accent font-medium'>{selectedBrand.name}</h1>
//                         <p className='text-black-mut'>{selectedBrand.slug}</p>
//                     </div>
//                     <div className='md:w-1/2'>
//                         <img className='w-full' src={selectedBrand.image} alt={selectedBrand.name} />
//                     </div>
//                 </div>
//                 {/* Modal footer */}
//                 <div className="flex justify-end items-center space-x-2 rtl:space-x-reverse rounded-b border-t border-gray-200 p-6">
//                     <button 
//                         // onClick={() => modal.hide()}
//                         onClick={handleCloseModal}
//                         type="button" className="rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
//                         Close
//                     </button>
//                 </div>
//                 </div>
//             </div>
//         </div>
//         )}
//     </>
// }

// export default Brands