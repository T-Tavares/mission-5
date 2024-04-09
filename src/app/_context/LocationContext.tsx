'use client';

import {time} from 'console';
import {createContext, useContext, useState, useEffect} from 'react';

// ---------------------------------------------------------------- //
// ------------------------ LOCATION TYPES ------------------------ //
// ---------------------------------------------------------------- //

type T_location = {lat: number; lng: number} | undefined | null;

// ---------------------------------------------------------------- //
// ----------------------- LOCATION CONTEXT ----------------------- //
// ---------------------------------------------------------------- //

const LocationContext = createContext({
    userLocation: undefined as T_location,

    getUserGeocode: () => {},
});

export const useLocation = () => useContext(LocationContext);

// ---------------------------------------------------------------- //
// ---------------------- LOCATION PROVIDER ----------------------- //
// ---------------------------------------------------------------- //

export const LocationProvider = ({children}: {children: any}) => {
    const [userLocation, setUserLocation] = useState<T_location>();

    // ---------------------------------------------------------------- //
    // ------------------ LOCATION PROVIDER METHODS ------------------- //
    // ---------------------------------------------------------------- //

    const getUserGeocode = async () => {
        const geocode = new Promise((resolve, reject) => {
            function success(location: any) {
                const userGeocode: T_location = {
                    lat: parseFloat(location.coords.latitude.toFixed(6)),
                    lng: parseFloat(location.coords.longitude.toFixed(6)),
                };
                resolve(userGeocode);
            }
            function error() {
                reject('Unable to retrieve your location');
            }
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        });

        geocode.then((userGeocode: any) => setUserLocation(userGeocode));
    };

    return (
        <LocationContext.Provider
            value={{
                userLocation,
                getUserGeocode,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};
