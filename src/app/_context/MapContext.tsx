'use client';

import React, {createContext, useContext, useEffect, useState, useRef} from 'react';
import {useLocation} from './LocationContext';
import {useDatabase} from './DatabaseContext';
import {Loader} from '@googlemaps/js-api-loader';
import {removeDuplicateNumbers} from '../_lib/helpers';

// ---------------------------------------------------------------- //
// -------------------------- MAP TYPES --------------------------- //
// ---------------------------------------------------------------- //

type T_MapRef = React.MutableRefObject<HTMLElement | null> | undefined | null;
type T_mapState = google.maps.Map | undefined | null;
type T_Geocode = {lat: number; lng: number} | undefined | null;
type T_Location = {
    _id: number;
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
        engine_oils: boolean;
        trailer_hire: boolean;
        car_wash: boolean;
        tyre_pressure: boolean;
        food_and_drink: boolean;
        toilets: boolean;
        atm: boolean;
        ev_charging: boolean;
        lpg_bottle_swap: boolean;
    };
};
type T_Database = T_Location[] | undefined | null;
type T_MarkersRef = Array<any> | null | undefined;

// ---------------------------------------------------------------- //
// ------------------------- MAP CONTEXT -------------------------- //
// ---------------------------------------------------------------- //

const MapContext = createContext({
    mapRef: undefined as T_MapRef,
    map: undefined as T_mapState,
    userLocation: undefined as T_Geocode,
    locationsDB: undefined as T_Database,
    markersRef: undefined as T_MarkersRef,

    initMap: () => {},
    initMarkers: () => {},
    initUserMarker: () => {},
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
    const markersRef = useRef<Array<any> | null>(null);

    // ----------- useLocation() AND useDatabase() CONTEXTS ----------- //

    const {userLocation} = useLocation();
    const {locationsDB, filters, fullFilters, clearFilters, getFilteredLocationsIDs} = useDatabase();

    // ---------------------------------------------------------------- //
    // ---------------------- useMap() METHODS ------------------------ //
    // ---------------------------------------------------------------- //

    // ---------------------------------------------------------------- //
    // ------------------- INITIALIZE MAP FUNCTION -------------------- //
    // ---------------------------------------------------------------- //

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

    // ---------------------------------------------------------------- //
    // --------------- INITIALIZE USER MARKER FUNCTION ---------------- //
    // ---------------------------------------------------------------- //

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

    // ----------------------------------------------------------------- //
    // ------------------- INITIALIZE MARKERS FUNCTION ----------------- //
    // ----------------------------------------------------------------- //

    const initMarkers = async () => {
        const markersPromises = (locationsDB || []).map(async (location: T_Location) => {
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

            return {
                _id: location._id,
                marker: marker,
            };
        });

        const markersArr = await Promise.all(markersPromises);

        markersRef.current = markersArr;
    };

    // ---------------------------------------------------------------- //
    // ---- SHOW AND HIDE MARKERS ACCORDING TO FILTERS LIST (ARR) ----- //
    // ---------------------------------------------------------------- //

    const showHideMarkers = () => {
        // ON RESET DISPLAY ALL MARKERS
        if (filters?.length === 0 || filters === null) {
            markersRef.current?.forEach(marker => marker.marker.setMap(map));
            return;
        }

        // GET FILTERED MARKERS IDS
        const filteredMarkersIDs = getFilteredLocationsIDs();

        // DISPLAY FILTERED MARKERS (LOCATIONS) AND HIDE THE REST
        markersRef.current?.forEach(markerObj => {
            const isFiltered = filteredMarkersIDs.includes(markerObj._id);
            isFiltered ? markerObj.marker.setMap(map) : markerObj.marker.setMap(null);
        });
    };

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

    // ------------ SET AND DISPLAY/HIDE FILTERS USEEFFECT ------------ //

    useEffect(() => {
        if (filters?.length === fullFilters?.length) return clearFilters(); // If filter array is full => Reset Filters)
        if (markersRef.current) {
            showHideMarkers();
        }
    }, [filters]);

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

                // Context States
                userLocation,
                locationsDB,
                markersRef: markersRef.current,
            }}
        >
            {children})
        </MapContext.Provider>
    );
};
