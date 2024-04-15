'use client';

import LocationCard from '@/app/_components/LocationMap/MapAndMenu/Menu/Stations/LocationCard';
import {useDatabase} from '@/app/_context/DatabaseContext';
import {ReactElement, useEffect, useState} from 'react';

export default function Stations() {
    const [locationsCards, setLocationsCards] = useState<ReactElement[]>();
    const {locationsDB, filters, getFilteredLocationsIDs} = useDatabase();
    const isLocatonsDBUp = locationsDB?.length > 0 ? true : false;

    useEffect(() => {
        /* 
            Filtering the cards here, hepls with repetitive requests 
            In a way we build up the whole thing and save it in the state, after that we just
            hide /  show the cards based on the filters
        */

        if (locationsDB) {
            let filteredLocations = locationsDB;

            if (filters?.length !== 0) {
                const filteredLocationsIDs = getFilteredLocationsIDs();
                filteredLocations = locationsDB.filter(location => filteredLocationsIDs.includes(location._id));
            }

            const cards = filteredLocations.map((location, index) => {
                return <LocationCard key={index + location.name} location={location} />;
            });
            setLocationsCards(cards);
        }
    }, [locationsDB, filters]);

    return (
        <>
            {isLocatonsDBUp && (
                <div className="flex flex-col items-center overflow-y-scroll">
                    <h3 className="font-medium text-lg self-start mt-6 mb-4 ml-11">Nearest</h3>
                    {locationsCards}
                </div>
            )}
            {!isLocatonsDBUp && <p className="m-10 text-center">Filters will be loaded once a location is provided.</p>}
        </>
    );
}
