'use client';
import {Loader} from '@googlemaps/js-api-loader';
import React, {useEffect, useState} from 'react';
import {BsFuelPumpFill} from 'react-icons/bs';
import {FaChevronRight} from 'react-icons/fa6';
import {IoMdSearch} from 'react-icons/io';
import {MdMyLocation} from 'react-icons/md';
import {RiTruckFill} from 'react-icons/ri';
import {services} from '../_lib/data';

import data from '../../../init/locations.json';
import LocationCard from './_locationComponents/Card';
import initializeMarkers from './_locationComponents/initializeMarkers';

const LocationMap = () => {
    const [selectedDiv, setSelectedDiv] = useState(2);
    const mapRef = React.useRef<HTMLDivElement>(null);

    const [locationsList, setLocationsList] = useState<any[]>(data);
    const [locationsElements, setLocationsElements] = useState<any[]>([]);

    // ----------- LOCATIONS LIST AND ELEMENTS useEffect() ------------ //

    // useEffect(() => {
    //     fetch('http://0.0.0.0:3000/api/locations')
    //         .then(res => res.json())
    //         .then(locations => setLocationsList(locations));
    // }, []);

    useEffect(() => {
        const locationEls = locationsList
            ?.map((location: any, index: number) => <LocationCard key={index} location={location} />)
            .slice(0, 10);

        setLocationsElements(locationEls);
    }, [locationsList]);

    // ----------------- GOOGLE MAPS API useEffect() ------------------ //

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string, // OR use ! to force it instead of as string
                version: 'weekly',
            });

            const {Map} = await loader.importLibrary('maps');
            const position = {
                lat: -43.3744881,
                lng: 172.4662705,
            };

            //map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 8,
                mapId: 'MY_NEXTJS_MAPID',
            };
            // setup map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            initializeMarkers(locationsList, map);
        };

        initMap();
    }, []);

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
                        <div className="flex flex-col justify-center items-center overflow-y-scroll">
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
