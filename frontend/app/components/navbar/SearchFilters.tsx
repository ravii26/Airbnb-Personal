'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
// import { BiSearch } from "react-icons/bi";


const SearchFilters = () => {
    const searchModal = useSearchModal();
    // onClick={() => searchModal.open('location')}
    return (
        <div className="max-w-[1260px] mx-auto xl:px-10 md:px-5 sm:px-1 px-2">
    <div className="flex flex-row items-center justify-between gap-1.5 md:gap-0">
        <div
            onClick={() => searchModal.open('location')}
            className="border-[1px] w-full md:w-auto py-1 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-xs font-semibold px-3">Anywhere</div>
                <div className="hidden sm:block text-xs font-semibold px-3 border-x-[1px] flex-1 text-center">
                    Any Week
                </div>
                <div className="text-xs pl-3 pr-1 text-gray-600 flex flex-row items-center gap-1.5">
                    <div className="hidden sm:block text-center">Add Guest</div>
                    <div className="p-1 bg-rose-500 rounded-full text-white bg-airbnb hover:bg-airbnb-dark">
                        <div className="p-1">
                            <div className="cursor-pointer p-1 lg:p-2 transition rounded-full text-white">
                                <svg
                                    viewBox="0 0 32 32"
                                    style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: 4, overflow: 'visible' }}
                                    aria-hidden="true" role="presentation" focusable="false"
                                >
                                    <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    )
}

export default SearchFilters;