'use client';

// ---------------------------------------------------------------- //
// --------------------------- IMPORTS ---------------------------- //
// ---------------------------------------------------------------- //
import React, {useEffect, useState} from 'react';

import BreadCrumbs from './LocationMap/BreadCrumbs';
import OptionsAndNavigation from './LocationMap/OptionsAndNavigation';
import MapAndMenu from './LocationMap/MapAndMenu';
// ---------------------------------------------------------------- //

const LocationMap = () => {
    return (
        <section className="flex w-full flex-col p-8">
            <BreadCrumbs />
            <OptionsAndNavigation />
            <MapAndMenu />
        </section>
    );
};
export default LocationMap;
