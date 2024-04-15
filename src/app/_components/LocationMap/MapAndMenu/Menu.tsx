'use client';

import {useState} from 'react';

import Filters from './Menu/Filters';
import Stations from './Menu/Stations';

export default function Menu() {
    const [selectedDiv, setSelectedDiv] = useState(1);
    const filtersCSS = selectedDiv === 1 ? '' : 'text-primary bg-gray-200/70';
    const stationsCSS = selectedDiv === 2 ? '' : 'text-primary bg-gray-200/70';
    // bg-gray-200/70 py-4 text-primary

    return (
        // prettier-ignore
        <div className="hidden xl:flex xl:flex-col border-2 border-gray-200 rounded-l-3xl h-full ">
            <div className="flex justify-center w-[21rem]">
                <div onClick={() => setSelectedDiv(1)} className={`flex w-full justify-center font-medium cursor-pointer py-4 transition-colors ${filtersCSS} rounded-tl-3xl `}>
                    <h3 className="active:scale-95 hover:scale-105">
                        Filters
                    </h3>
                </div>
                <div onClick={() => setSelectedDiv(2)} className={`flex w-full justify-center font-medium cursor-pointer py-4 transition-colors ${stationsCSS}`} >
                    <h3 className="active:scale-95 hover:scale-105">
                        Stations
                    </h3>
                </div>
            </div>
            {selectedDiv === 1 && <Filters />}
            {selectedDiv === 2 && <Stations />}
        </div>
    );
}
