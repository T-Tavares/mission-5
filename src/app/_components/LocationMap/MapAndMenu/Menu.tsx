'use client';

import {useState} from 'react';

import Filters from './Menu/Filters';
import Stations from './Menu/Stations';

export default function Menu() {
    const [selectedDiv, setSelectedDiv] = useState(1);

    return (
        <div className="hidden xl:flex xl:flex-col border-2 border-gray-200 rounded-l-3xl h-full ">
            <div className="flex justify-center w-[21rem]">
                <div className="flex w-full justify-center py-4 font-medium cursor-pointer">
                    <h3 onClick={() => setSelectedDiv(1)} className="active:scale-95 hover:scale-105">
                        Filters
                    </h3>
                </div>
                <div className="flex w-full justify-center bg-gray-200/70 py-4 text-primary font-medium cursor-pointer ">
                    <h3 onClick={() => setSelectedDiv(2)} className="active:scale-95 hover:scale-105">
                        Stations
                    </h3>
                </div>
            </div>
            {selectedDiv === 1 && <Filters />}
            {selectedDiv === 2 && <Stations />}
            {/* {selectedDiv === 2 && (
                <div className="flex flex-col items-center overflow-y-scroll">
                    <h3 className="font-medium text-lg self-start mt-6 mb-4 ml-11">Nearest</h3>
                    {locationsElements}
                </div>
            )} */}
        </div>
    );
}
