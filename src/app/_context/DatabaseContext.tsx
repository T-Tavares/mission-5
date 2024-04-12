'use client';
import React, {createContext, useContext, useEffect, useState} from 'react';
import data from '../_lib/locations.json'; // temporary data
import {useLocation} from './LocationContext';
import {useMap} from './MapContext';

// ---------------------------------------------------------------- //
// ------------------------ DATABASE TYPES ------------------------ //
// ---------------------------------------------------------------- //

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
type T_Geocode = {lat: number; lng: number} | undefined | null;
type T_GeocodeMatrix = {lat: number; lng: number}[] | undefined | null;

// ---------------------------------------------------------------- //
// ----------------------- DATABASE CONTEXT ----------------------- //
// ---------------------------------------------------------------- //

const DatabaseContext = createContext({
    rawDatabase: undefined as T_Database,
    locationsDB: undefined as T_Database,
    userLocation: undefined as T_Geocode,

    // filteredLocationsDB: undefined as T_database,

    fetchRawDatabase: () => {},
    updateLocationsDB: () => {},
    // addDistanceToLocationsDB: (rawDB: T_Database, geocode: T_Geocode) => {},
    // filterLocationsDB: () => {},
});

export const useDatabase = () => useContext(DatabaseContext);

// ---------------------------------------------------------------- //
// ---------------------- DATABASE PROVIDER ----------------------- //
// ---------------------------------------------------------------- //

export const DatabaseProvider = ({children}: {children: React.ReactNode}) => {
    const [rawDatabase, setRawDatabase] = useState<T_Database>();
    const [locationsDB, setLocationsDB] = useState<T_Database>([]);
    // const [filteredLocationsDB, setFilteredLocationsDB] = useState<T_database>([]);

    const {userLocation} = useLocation();
    const {initMap} = useMap();

    // ------------------- FETCH RAW DATA FUNCTION -------------------- //

    const fetchRawDatabase = async () => {
        fetch('http://0.0.0.0:3000/api/get-locations')
            .then(res => res.json())
            .then(locations => setRawDatabase(locations));
    };
    // ---------------------------------------------------------------- //
    // ------------------- FETCH RAW DATA useEffect ------------------- //
    // ----------------- FETCH RAW DATA ON PAGE LOAD ------------------ //
    // ---------------------------------------------------------------- //

    // useEffect(() => {
    //     fetchRawDatabase();
    // }, []);

    // ---------------------------------------------------------------- //
    // ------------- GEOCODE AND DISTANCE MATRIX HANDLERS ------------- //
    // ----------------------- INTERNAL METHODS ----------------------- //
    // ---------------------------------------------------------------- //

    // ------------- GET GEOCODE MATRIX FROM RAWDATABASE -------------- //

    const _getGeocodeMatrix = (locationsDB: any) => {
        const geoMatrix = locationsDB.map((location: any) => {
            return {
                lat: location.geocode.lat,
                lng: location.geocode.lng,
            };
        });
        return geoMatrix;
    };

    // -------------- GOOGLE API FETCH DISTANCE MATRIX  --------------- //

    const _getDistanceMatrix = async (geocodeMatrix: {lat: number; lng: number}[]) => {
        // Initialize Google API Service

        const {DistanceMatrixService} = (await google.maps.importLibrary('routes')) as google.maps.RoutesLibrary;
        const service = new DistanceMatrixService();
        const originsArr: any = geocodeMatrix.map(userLocation => userLocation);

        // Request Object Options
        const request = {
            origins: [...originsArr],
            destinations: [...geocodeMatrix],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
        };

        const response = await service.getDistanceMatrix(request);
        return response;

        // return response;
    };
    // ---------------------------------------------------------------- //
    // ------------------- BUILD LOCATIONS DATABASE ------------------- //
    // ----------- COMBINE DISTANCE MATRIX TO RAW DATABASE ------------ //
    // ---------------------------------------------------------------- //
    /* 
    TODO 
    REBUILD updateLocationsDB
    _addDistanceToLocationsDB as internal function

    test ways to store the markers as an array so they can be shown/hidden 
    as we filter the DB further down.

*/
    const _addDistanceToLocationsDB = async () => {
        const geocodeMatrix = [...(await _getGeocodeMatrix(rawDatabase))];
        const distanceMatrix = await _getDistanceMatrix(geocodeMatrix);

        const updatedLocationsDB = rawDatabase
            ?.map((location: any, index: number) => {
                //
                // TO KEEP THE INTEGRITY OF THE DB
                // IF GOOGLE CANT CALCULATE DISTANCE FOR SOME REASOM... RETURNS N/A

                if (distanceMatrix.rows[0].elements[index].status !== 'OK') return;

                return {
                    ...location,
                    distance: distanceMatrix.rows[0].elements[index].distance,
                    duration: distanceMatrix.rows[0].elements[index].duration,
                };
            })
            .filter((location: any) => location);

        return updatedLocationsDB;
    };

    const sortLocationsDB = (DB: T_Database) => {
        return DB?.sort((a: any, b: any) => a.distance.value - b.distance.value);
    };

    const updateLocationsDB = async () => {
        const updatedLocations = await _addDistanceToLocationsDB();
        const sortedLocations = sortLocationsDB(updatedLocations);
        setLocationsDB(sortedLocations);
    };

    /* 
        The useEffects work as an async await on this project.
        Since some components and logic depend on the previous useEffects to be completed.
        
        The if statements seems redundant but they prevent the functions to be initiated while promises are being resolved.
        They also CAN NOT be used in a single line if. It'll throw the useEffect into an infinite loop in most cases.
    
    */
    useEffect(() => {
        setRawDatabase(data);
    }, []);

    useEffect(() => {
        if (userLocation && rawDatabase) {
            updateLocationsDB();
        }
    }, [userLocation]);

    // const filterLocationsDB = (locationsDB: T_database) => {};

    return (
        <DatabaseContext.Provider
            value={{
                rawDatabase,
                fetchRawDatabase,
                updateLocationsDB,
                locationsDB,
                userLocation,
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};
