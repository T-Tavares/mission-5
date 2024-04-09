'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';
import {useLocation} from './LocationContext';
import {Loader} from '@googlemaps/js-api-loader';

// ---------------------------------------------------------------- //
// -------------------------- MAP TYPES --------------------------- //
// ---------------------------------------------------------------- //

type T_MapRef = React.RefObject<HTMLDivElement> | null | undefined;
type T_mapState = google.maps.Map | undefined | null;
type T_location = {lat: number; lng: number} | undefined | null;

// ---------------------------------------------------------------- //
// ------------------------- MAP CONTEXT -------------------------- //
// ---------------------------------------------------------------- //

const MapContext = createContext({
    mapRef: undefined as T_MapRef,
    map: undefined as T_mapState,
    userLocation: undefined as T_location,

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

    const [map, setMap] = useState<T_mapState>();
    const mapRef: T_MapRef = React.useRef<HTMLDivElement>(null);

    // -------------------- useLocation() CONTEXT  -------------------- //
    const {userLocation} = useLocation();

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
            zoom: 14,
            mapId: 'MY_NEXTJS_MAPID',
        };

        // set mapRef to the BUILT MAP
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        setMap(map);
    };

    // ---------------------------------------------------------------- //

    const initMarkers = () => {};
    const initUserMarker = async () => {
        const {AdvancedMarkerElement} = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

        const marker = new AdvancedMarkerElement({
            map: map,
            position: userLocation,
            title: "You're Here!",
        });
    };
    const filterMarkers = () => {};

    useEffect(() => {
        //
        if (userLocation) {
            initMap();
            initUserMarker();
        }
    }, [userLocation]);

    return (
        <MapContext.Provider
            value={{
                mapRef,
                map,

                initMap,
                initMarkers,
                initUserMarker,
                filterMarkers,

                // useLocation Context
                userLocation,
            }}
        >
            {children})
        </MapContext.Provider>
    );
};
