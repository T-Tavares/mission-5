'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';
import {Loader} from '@googlemaps/js-api-loader';

type T_MapRef = React.RefObject<HTMLDivElement> | null | undefined;
type T_mapState = google.maps.Map | undefined | null;
type T_location = {lat: number; lng: number} | undefined | null;

// ----------------- CREATING AND EXPORT CONTEXT ------------------ //

const MapContext = createContext({
    mapRef: undefined as T_MapRef,
    map: undefined as T_mapState,
    userLocation: undefined as T_location,

    getUserGeolocation: () => {},
    getUserChoosenGeolocation: () => {},

    addUserReferenceToDB: () => {}, // Adds distance from user to locations returns new DB Obj

    initMap: () => {},
    initMarkers: () => {},
    initUserMarker: () => {},

    filterMarkers: () => {},
});

export const useMapContext = () => useContext(MapContext);

// ---------------- CREATE AND EXPORT THE PROVIDER ---------------- //

export const MapProvider = ({children}: {children: any}) => {
    //

    /* 
        Bare with me... That's a long section.

        All the states here are shared and controlled across those methods. 
        That's the main reason to keep them here. But that way we can reuse
        all users interactions across multiple pages on the app.
        And also keep the logic separated from the components.

        To help you navigate this file will be full of titles and comments.
    */

    // ---------------------------------------------------------------- //
    // --------------------- MAP STATE VARIABLES ---------------------- //
    // ---------------------------------------------------------------- //

    const [map, setMap] = useState<T_mapState>();
    const [userLocation, setUserLocation] = useState<T_location>();
    const [zLocationsDB, setZLocationsDB] = useState([]);

    const mapRef: T_MapRef = React.useRef<HTMLDivElement>(null);

    // ---------------------------------------------------------------- //
    // --------------------- MapProvider METHODS ---------------------- //
    // ---------------------------------------------------------------- //

    // ---------------------------------------------------------------- //
    // ----------------------- GET GEOLOCATION ------------------------ //
    // ---------------------------------------------------------------- //

    // --------------------- GET USER GEOLOCATION --------------------- //

    const getUserGeolocation = () => {
        try {
            navigator.geolocation.getCurrentPosition(location => {
                const userGeocode: T_location = {
                    lat: parseFloat(location.coords.latitude.toFixed(6)),
                    lng: parseFloat(location.coords.longitude.toFixed(6)),
                };
                setUserLocation(userGeocode);
            });
        } catch (error: any) {
            return new Error('Error getting user geolocation', error);
        }
    };

    // -------------------- USER PICK GEOLOCATION --------------------- //

    const getUserChoosenGeolocation = () => {};

    // ---------------- INITIALISE MAP AFTER LOCATION ----------------- //

    // After a Location is choosen by the user, this useEffect will initialize the map.
    useEffect(() => {
        /* 
            Because useEffect runs on the initial website render. this is a safe clause 
            to only render the map if the user has choose a location.
        */
        if (userLocation) initMap();
    }, [userLocation]);

    // ------------------- INITIALIZE MAP FUNCTION -------------------- //

    // Loads a Google Map API and store it in the map state.

    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
            version: 'weekly',
        });

        const {Map} = await loader.importLibrary('maps');
        const position: any = {lat: -36.798969, lng: 174.741641};

        // MAP OPTIONS
        const mapOptions: google.maps.MapOptions = {
            center: position,
            zoom: 12,
            mapId: 'MY_NEXTJS_MAPID',
        };

        // set mapRef to the BUILT MAP
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        setMap(map);
    };

    // ---------------------------------------------------------------- //
    // ----------------------- MAP INTERACTIONS ----------------------- //
    // ---------------------------------------------------------------- //

    const initMarkers = () => {};
    const initUserMarker = () => {};

    const filterMarkers = () => {};

    const addUserReferenceToDB = () => {}; // TODO MOVE TO DATABASE CONTEXT

    return (
        <MapContext.Provider
            value={{
                mapRef,
                map,
                userLocation,

                getUserGeolocation,
                getUserChoosenGeolocation,

                addUserReferenceToDB,

                initMap,
                initMarkers,
                initUserMarker,

                filterMarkers,
            }}
        >
            {children})
        </MapContext.Provider>
    );
};
