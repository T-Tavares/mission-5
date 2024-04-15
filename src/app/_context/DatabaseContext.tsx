'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';
import data from '../_lib/locations.json'; // temporary data

import {removeDuplicateNumbers} from '../_lib/helpers';
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
type T_Services =
    | 'atm'
    | 'car_wash'
    | 'engine_oils'
    | 'ev_charging'
    | 'food_and_drink'
    | 'lpg_bottle_swap'
    | 'toilets'
    | 'trailer_hire'
    | 'tyre_pressure';

type T_Filters = null | undefined | T_Services[];
// ---------------------------------------------------------------- //
// ----------------------- DATABASE CONTEXT ----------------------- //
// ---------------------------------------------------------------- //

const DatabaseContext = createContext({
    rawDatabase: undefined as T_Database,
    locationsDB: undefined as T_Database,

    filters: null as T_Filters,
    fullFilters: null as T_Filters,

    fetchRawDatabase: () => {},
    updateLocationsDB: () => {},

    addRemoveFilters: (clickedFilter: T_Services) => {},
    clearFilters: () => {},
    getFilteredLocationsIDs: () => {},
});

export const useDatabase = () => useContext(DatabaseContext);

// ---------------------------------------------------------------- //
// ---------------------- DATABASE PROVIDER ----------------------- //
// ---------------------------------------------------------------- //

export const DatabaseProvider = ({children}: {children: React.ReactNode}) => {
    const [rawDatabase, setRawDatabase] = useState<T_Database>();
    const [locationsDB, setLocationsDB] = useState<T_Database>([]);

    const fullFilters: T_Filters = [
        'atm',
        'car_wash',
        'engine_oils',
        'ev_charging',
        'food_and_drink',
        'lpg_bottle_swap',
        'toilets',
        'trailer_hire',
        'tyre_pressure',
    ]; // This is the full list of filters for comparison logic purposes
    // const [filters, setFilters] = useState<T_Filters>(fullFilters);
    const [filters, setFilters] = useState<T_Filters>([]);

    const {userLocation} = useLocation();

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
        /* 
            This function is here for reference.

            Runnign the matrix API became very costy, so I decided to use a JSON file 
            for demonstrations instead.
            Everything work the same way. except the database already have the distance and duration values.
            they are completely random and not accurate. Is just for demonstration purposes.
            
        */

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

*/
    const _addDistanceToLocationsDB = async () => {
        /* 
            This function is here for reference.

            Runnign the matrix API became very costy, so I decided to use a JSON file 
            for demonstrations instead.
            Everything work the same way. except the database already have the distance and duration values.
            they are completely random and not accurate. Is just for demonstration purposes.
        */

        const geocodeMatrix = [...(await _getGeocodeMatrix(rawDatabase))];
        const distanceMatrix = await _getDistanceMatrix(geocodeMatrix);

        const updatedLocationsDB = rawDatabase
            ?.map((location: any, index: number) => {
                if (distanceMatrix.rows[0].elements[index].status !== 'OK') return;

                return {
                    ...location,
                    distance: distanceMatrix.rows[0].elements[index].distance,
                    duration: distanceMatrix.rows[0].elements[index].duration,
                };
            })
            .filter((location: any) => location);
        //  .filter() GET RID OF UNDEFINED VALUES IN CASE GOOGLE CAN'T CALCULATE DISTANCE

        return updatedLocationsDB;
    };

    const sortLocationsDB = (DB: T_Database) => {
        return DB?.sort((a: any, b: any) => a.distance.value - b.distance.value);
    };

    const updateLocationsDB = async () => {
        /* 
            Code that uses Google API

            const updatedLocations = await _addDistanceToLocationsDB();
            const sortedLocations = sortLocationsDB(updatedLocations);
            const sortedLocations = sortLocationsDB(locationsDB);
            setLocationsDB(sortedLocations); 
        */

        /* 
            Why I have a setTimeout here?

            Because with the API theres a await time until the DB arrives, everything can run smoothly
            I have to mimic this on the static page in order to not change the logic behind it.
        */
        setTimeout(() => {
            const sortedLocations = sortLocationsDB(rawDatabase);
            setLocationsDB(sortedLocations);
        }, 2000);
    };

    // ---------------------------------------------------------------- //
    // ------------ ADD AND REMOVE FILTERS FROM LIST (ARR) ------------ //
    // ---------------------------------------------------------------- //

    const clearFilters = () => setFilters([]);

    const addRemoveFilters = (clickedFilter: T_Services) => {
        if (filters?.includes(clickedFilter)) {
            setFilters((prevFilters: T_Filters) => prevFilters?.filter(filter => filter !== clickedFilter));
            return;
        }
        setFilters((prevFilters: T_Filters) => [...(prevFilters || []), clickedFilter]);
    };

    const getFilteredLocationsIDs = (): number[] | [] => {
        // IF NO FILTERS RETURN ALL LOCATIONS
        if (filters?.length === 0) return [];

        // IDs ARRAY PLACEHOLDER
        const filteredIDsSum: number[] = [];

        // GETTING FILTERED IDS
        filters?.forEach(filter => {
            locationsDB?.forEach(location => {
                if (location.services[filter]) {
                    filteredIDsSum.push(location._id);
                }
            });
        });

        // REMOVE DUPLICATES AND ASCENDING SORT
        const filteredMarkersIDs = removeDuplicateNumbers(filteredIDsSum).sort((a, b) => a - b);

        return filteredMarkersIDs;
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

    return (
        <DatabaseContext.Provider
            value={{
                rawDatabase,
                fetchRawDatabase,
                updateLocationsDB,

                locationsDB,

                filters,
                fullFilters,

                clearFilters,
                addRemoveFilters,
                getFilteredLocationsIDs,
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};
