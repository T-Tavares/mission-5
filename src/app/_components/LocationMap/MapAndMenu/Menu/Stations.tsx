'use client';

import LocationCard from '@/app/_components/LocationMap/MapAndMenu/Menu/Stations/card';
import {useDatabase} from '@/app/_context/DatabaseContext';
import {ReactElement, useEffect, useState} from 'react';

export default function Stations() {
    const [locationsCards, setLocationsCards] = useState<ReactElement[]>();
    const {locationsDB} = useDatabase();

    useEffect(() => {
        if (locationsDB) {
            const cards = locationsDB.map((location, index) => {
                return <LocationCard key={index + location.name} location={location} />;
            });
            setLocationsCards(cards);
        }
    }, [locationsDB]);

    return (
        <div className="flex flex-col items-center overflow-y-scroll">
            <h3 className="font-medium text-lg self-start mt-6 mb-4 ml-11">Nearest</h3>
            {locationsCards}
        </div>
    );
}
