'use client';

import {useState, useEffect} from 'react';
import {useMap} from '@/app/_context/MapContext';

import Menu from './MapAndMenu/Menu';
import PickYourLocation from './MapAndMenu/PickYourLocation';

export default function MapAndMenu() {
    const {mapRef, userLocation, filterMarkers} = useMap();

    return (
        <div className="flex flex-col xl:flex xl:flex-row w-full h-[58rem]  rounded-3xl mt-9">
            <Menu />
            {!userLocation && <PickYourLocation />}
            {userLocation && <div ref={mapRef} className="w-full  rounded-r-3xl hidden xl:flex" />}
            <button onClick={filterMarkers}>Show Time</button>
        </div>
    );
}
