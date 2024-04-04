'use client';

// ---------------------------------------------------------------- //
// --------------------------- IMPORTS ---------------------------- //
// ---------------------------------------------------------------- //
import React, {useEffect, useState} from 'react';
import {services} from '../_lib/data';

//              LOCAL DB TO SIMULATE API ON DEVELOPMENT             //

import data from '../_lib/locations.json';

// ---------------------- REACT ICON IMPORTS ---------------------- //

import {BsFuelPumpFill} from 'react-icons/bs';
import {FaChevronRight} from 'react-icons/fa6';
import {IoMdSearch} from 'react-icons/io';
import {MdMyLocation} from 'react-icons/md';
import {RiTruckFill} from 'react-icons/ri';

// ----------- GOOGLE MAPS AND MAPS CONTROLLERS IMPORTS ----------- //

import {Loader} from '@googlemaps/js-api-loader';
import LocationCard from './card';

import initializeMarkers from './_mapsControllers/initializeMarkers';
import initializeUserMarker from './_mapsControllers/initializeUserMarker';
import getUserGeocode from './_mapsControllers/getUserGeocode';
import getCloserPaths, {getPathAtoB} from './_mapsControllers/getPathAtoB';
import updateLocationsDB from './_mapsControllers/updateLocationsDB';

// ---------------------------------------------------------------- //
// ---------------------------------------------------------------- //

const LocationMap = () => {
    const [selectedDiv, setSelectedDiv] = useState(2); // ........................ FILTER AND STATIONS MENU

    const mapRef = React.useRef<HTMLDivElement>(null); // ........................ REFERENCING MAP DIV FOR GOOGLE MAPS

    const [userGeocode, setUserGeocode] = useState<any>({}); // .................. HOLDS USER GEOCODE / OR CHOOSEN GEOCODE (LOCATION)
    // const [locationsRawDB, setLocationsRawDB] = useState<any[]>(); // ............ INITIAL DATA FETCH, HOLDS RAW DATA FROM DB
    const [locationsRawDB, setLocationsRawDB] = useState<any[]>(data); // ..... RAW DATA FROM LOCAL JSON
    const [locationsUpdatedDB, setLocationsUpdatedDB] = useState<any[]>([]); // .. HOLDS UPDATED DATA FROM DB WITH DISTANCE AND DURATION
    const [locationsDB, setLocationsDB] = useState<any[]>([]); // ................ HOLDS FINAL REVISION DATA FROM DB (SORTED, FILTERED, ETC...)

    const [locationsElements, setLocationsElements] = useState<any[]>([]); // .... HOLDS LOCATION CARDS ELEMENTS

    // ---------------------------------------------------------------- //
    // ------------------------- useEffects() ------------------------- //
    // ---------------------------------------------------------------- //

    // ----------------------- GET USER GEOCODE ----------------------- //

    useEffect(() => {
        async function getAndSetUserGeocode() {
            const geocode = await getUserGeocode();
            setUserGeocode(geocode);
        }
        getAndSetUserGeocode();
    }, []);

    // ------------------ FETCHING LOCATIONS FROM DB ------------------ //

    // useEffect(() => {
    //     fetch('http://0.0.0.0:3000/api/get-locations')
    //         .then(res => res.json())
    //         .then(locations => setLocationsRawDB(locations));
    // }, []);

    // -------------- CALCULATING DISTANCE AND DURATION  -------------- //
    // ---------------- AND CREATING LOCAL UPDATED DB ----------------- //

    // Initial Plan was to sort it here.. clean and easy... but Google API had other plans...🥲

    // useEffect(() => {
    //     updateLocationsDB(locationsRawDB, userGeocode).then(updatedDB => setLocationsUpdatedDB(updatedDB));
    // }, [locationsRawDB]);

    // ------------- FILTER OR SORT UPDATED LOCATIONS DB -------------- //

    useEffect(() => {
        const sortedDB = locationsUpdatedDB.sort((a, b) => a.distance.value - b.distance.value);
        setLocationsDB(sortedDB);
    }, [locationsUpdatedDB]);

    // ------------------- BUILDING LOCATION CARDS -------------------- //

    useEffect(() => {
        const locationEls = locationsDB
            .map((location: any, index: number) => <LocationCard key={index} location={location} />)
            .slice(0, 10); // TODO REMOVE LATER

        setLocationsElements(locationEls);
    }, [locationsDB]);

    // ---------------------------------------------------------------- //
    // ----------------------- GOOGLE MAPS API ------------------------ //
    // ---------------------------------------------------------------- //
    // ---------- GOOGLE MAPS INITIATION, RENDER AND UPDATES ---------- //
    // ---------------------------------------------------------------- //

    useEffect(() => {
        const initMap = async () => {
            /* 
                Because this function interacts with most of the states sets on this page
                I choose to keep it here for better maintenance, readability and to avoid prop drilling.
                It also rerender according to user interactions to the application.

                So please, bare with this wordy code.
            */

            // REQUEST GOOGLE MAPS LIBRARY AND INIT MAP
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
                version: 'weekly',
            });

            const {Map} = await loader.importLibrary('maps');
            const position: any = userGeocode || (await getUserGeocode()); // TRY TO GET USER GEOCODE IF NOT PROVIDED

            // MAP OPTIONS
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 12,
                mapId: 'MY_NEXTJS_MAPID',
            };

            // set mapRef to the BUILT MAP
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            updateLocationsDB(locationsRawDB, userGeocode).then(updatedDB => {
                /* 
                    Google Distance Matrix API demands to work with a map instance. 
                    My guess is so people don't use google API to feed other companies services.
    
                    That said. The updatedLocationsDB relies on this API to work. So I had to keep 
                    it here. Because of that any other function that falls under the updatedLocationsDB
                    to work, have to be called here. 
    
                    It also prevents a bunch of untimed renders and API calls.
                    
                    Not Ideal, but that's the way it works.
                */
                console.log(updatedDB);
                initializeUserMarker(map, userGeocode);
                getCloserPaths(map, userGeocode, updatedDB);
                setLocationsUpdatedDB(updatedDB);
                initializeMarkers(map, updatedDB || []);
            });
        };

        initMap();
    }, [userGeocode, locationsRawDB]);

    // ---------------------------------------------------------------- //
    // -------------------------- COMPONENT --------------------------- //
    // ---------------------------------------------------------------- //

    return (
        <section className="flex w-full flex-col p-8">
            <div className="flex  w-[12rem] pt-4">
                <p className="flex text-primary">
                    Home{' '}
                    <span className="pt-1 px-1">
                        <FaChevronRight />
                    </span>{' '}
                    Find station{' '}
                    <span className="pt-1 px-1">
                        <FaChevronRight />
                    </span>
                </p>
            </div>

            <div className="flex flex-col pt-8">
                <h1 className="text-2xl font-medium">Find a station</h1>
                <div className="flex  pt-4">
                    <div className="flex flex-1">
                        <div className="flex relative">
                            <input
                                placeholder="Search a location"
                                className="w-[35rem] p-1 border-2 border-primary rounded-full pl-5 placeholder-[#7e3b98] placeholder:font-medium focus:outline-none"
                            ></input>
                            <IoMdSearch className="text-primary text-xl absolute top-3 right-4" />
                        </div>
                        <div className="flex justify-center  pl-6 w-[16rem] relative">
                            <button className="relative py-2 w-full whitespace-nowrap text-primary font-medium rounded-full  transition-all duration-400  bg-gray-200/70 hover:scale-105 active:scale-100">
                                <MdMyLocation className="text-2xl absolute left-6 " /> Use my location
                            </button>
                        </div>
                    </div>
                    <div className="flex pl-[3rem] gap-4">
                        <div className="flex">
                            <button className="px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105   active:scale-100">
                                Select a fuel type
                            </button>
                        </div>
                        <div className="flex">
                            <button className="px-6 py-2 w-full whitespace-nowrap bg-primary text-white font-medium rounded-full border-2 border-primary transition-all duration-400 hover:scale-105 active:scale-100">
                                Show prices
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full h-[58rem]  rounded-3xl mt-10">
                <div className="flex flex-col border-2 border-gray-200 rounded-l-3xl h-full ">
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
                    {selectedDiv === 1 && (
                        <div className="flex flex-col ">
                            <div className="flex justify-center py-4">
                                <div className="flex w-full justify-center py-4 font-medium">
                                    <h3>Station type</h3>
                                </div>
                                <div className="flex w-full justify-center py-4 font-medium text-primary">
                                    <h3>Clear filter</h3>
                                </div>
                            </div>

                            <div className="flex flex-col w-[14rem] mx-auto gap-3 ">
                                <div className="flex ">
                                    <button className="relative px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-gray-200 transition-all active:scale-95">
                                        <RiTruckFill className="absolute text-[1.4rem] top-2 left-5" />
                                        Truck Stop
                                    </button>
                                </div>

                                <div className="flex ">
                                    <button className="relative px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-gray-200 transition-all active:scale-95">
                                        <BsFuelPumpFill className="absolute text-[1.3rem] top-2 left-5" />
                                        Service Station
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex py-10 pl-10">
                                    <h3 className="font-medium text-base">Services</h3>
                                </div>
                                <div className="flex flex-col gap-4 w-[14rem] mx-auto">
                                    {services.map((service, index) => (
                                        <div key={index} className="">
                                            <button className="relative px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-gray-200 transition-all active:scale-95">
                                                <div className="absolute text-2xl pr-4 left-4">{service.icon}</div>
                                                <div className="text-lg">{service.name}</div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* {selectedDiv === 2 && locationsElements} */}
                    {selectedDiv === 2 && (
                        <div className="flex flex-col items-center overflow-y-scroll">
                            <h3 className="font-medium text-lg self-start mt-6 mb-4 ml-11">Nearest</h3>
                            {locationsElements}
                        </div>
                    )}
                </div>

                <div ref={mapRef} className="w-full  rounded-r-3xl" />
            </div>
        </section>
    );
};
export default LocationMap;
