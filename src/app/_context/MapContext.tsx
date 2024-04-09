'use client';

import React, {createContext, useContext, useEffect, useState, useRef} from 'react';
import {useLocation} from './LocationContext';
import {useDatabase} from './DatabaseContext';
import {Loader} from '@googlemaps/js-api-loader';

// ---------------------------------------------------------------- //
// -------------------------- MAP TYPES --------------------------- //
// ---------------------------------------------------------------- //

type T_MapRef = React.MutableRefObject<HTMLElement | null> | undefined | null;
type T_mapState = google.maps.Map | undefined | null;
type T_Geocode = {lat: number; lng: number} | undefined | null;
type T_Location = {
    name: string;
    address: string;
    price: number;
    openingHours: {
        from: number;
        to: number;
    };
    duration?: {
        text: string;
        value: number;
    };
    distance?: {
        text: string;
        value: number;
    };
    geocode: {
        lat: number;
        lng: number;
    };
    type: string;
    services: {
        trailer_hire: boolean;
        car_wash: boolean;
        tire_pressure: boolean;
        food_and_drink: boolean;
        toilets: boolean;
        atm: boolean;
        ev_charging: boolean;
        lpg_bottle_swap: boolean;
    };
};
type T_Database = T_Location[] | undefined | null;

// ---------------------------------------------------------------- //
// ------------------------- MAP CONTEXT -------------------------- //
// ---------------------------------------------------------------- //

const MapContext = createContext({
    mapRef: undefined as T_MapRef,
    map: undefined as T_mapState,
    userLocation: undefined as T_Geocode,
    locationsDB: undefined as T_Database,

    initMap: () => {},
    initMarkers: () => {},
    initUserMarker: () => {},

    filterMarkers: () => {},
});

export const useMap = () => useContext(MapContext);

// ---------------------------------------------------------------- //
// ------------------------- MAP PROVIDER ------------------------- //
// ---------------------------------------------------------------- //

export const MapProvider = ({children}: {children: any}) => {
    //
    // ----------------------- useMap() STATES ------------------------ //

    const [map, setMap] = useState<T_mapState>(null);
    const mapRef = useRef<HTMLElement>(null);

    // ----------- useLocation() AND useDatabase() CONTEXTS ----------- //

    const {userLocation} = useLocation();
    const {locationsDB} = useDatabase();

    // ---------------------------------------------------------------- //
    // ---------------------- useMap() METHODS ------------------------ //
    // ---------------------------------------------------------------- //

    // ------------------- INITIALIZE MAP FUNCTION -------------------- //

    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
            version: 'weekly',
        });

        const {Map} = await loader.importLibrary('maps');
        const position: any = userLocation;

        // MAP OPTIONS
        const mapOptions: google.maps.MapOptions = {
            center: position,
            zoom: 12,
            mapId: 'MY_NEXTJS_MAPID',
        };

        // set mapRef to the BUILT MAP

        const map = new Map(mapRef.current as HTMLElement, mapOptions);
        setMap(map);
    };

    // --------------- INITIALIZE USER MARKER FUNCTION ---------------- //

    const initUserMarker = async () => {
        const {AdvancedMarkerElement} = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

        const markerDiv = document.createElement('div');
        markerDiv.innerHTML = `
                        <div class="flex flex-col justify-center items-center">
                            <img src="/user-marker-black.png" class="h-12 w-12" /> 
                        </div> 
                        `;

        const markerOptions = {
            map: map,
            position: userLocation,
            content: markerDiv,
        };
        const marker = new AdvancedMarkerElement(markerOptions);
    };

    // ------------------- INITIALIZE MARKERS FUNCTION ----------------- //

    const initMarkers = async () => {
        locationsDB?.forEach(async (location: T_Location) => {
            const {AdvancedMarkerElement} = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

            const markerDiv = document.createElement('div');

            markerDiv.innerHTML = `
                            <div class="flex flex-col justify-center items-center">
                                <img src="/marker.png" class="h-12 w-12" />
                            </div>
                            `;

            const marker = new AdvancedMarkerElement({
                map: map,
                position: location.geocode,
                content: markerDiv,
            });
        });
    };

    const filterMarkers = () => {};

    // ---------------------------------------------------------------- //
    // -------------------- MAP CONTEXT USEEFFECTS -------------------- //
    // ---------------------------------------------------------------- //

    /* 
        The useEffects work as an async await on this project.
        Since some components and logic depend on the previous useEffects to be completed.
        
        The if statements seems redundant but they prevent the functions to be initiated while promises are being resolved.
        They also CAN NOT be used in a single line if. It'll throw the useEffect into an infinite loop in most cases.
    
    */

    // ------------------- INITIALIZE MAP USEEFFECT ------------------- //

    useEffect(() => {
        //
        if (userLocation && mapRef.current) {
            initMap();
        }
    }, [userLocation]);

    // ----------------- CREATE USER MARKER USEEFFECT ----------------- //

    useEffect(() => {
        if (map) {
            initUserMarker();
        }
    }, [map]);

    // -------------- CREATE LOCATIONS  MARKERS USEEFFECT ------------- //

    useEffect(() => {
        if (locationsDB) {
            initMarkers();
        }
    }, [map, locationsDB]);

    // ---------------------------------------------------------------- //
    // ----------------- MAP CONTEXT PROVIDER RETURN ------------------ //
    // ---------------------------------------------------------------- //

    return (
        <MapContext.Provider
            value={{
                mapRef,
                map,

                initMap,
                initMarkers,
                initUserMarker,
                filterMarkers,

                // Context States
                userLocation,
                locationsDB,
            }}
        >
            {children})
        </MapContext.Provider>
    );
};
