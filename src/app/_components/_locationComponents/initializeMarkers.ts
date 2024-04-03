'use client';

import {Loader} from '@googlemaps/js-api-loader';
import markerImage from '../../../../public/marker.png';

export default async function initializeMarkers(locationsList: any[], map: any) {
    // REQUEST LIBRARIES
    const {AdvancedMarkerElement} = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

    return locationsList.map(location => {
        const markerIcon = document.createElement('img');
        markerIcon.src = '/marker.png';

        const marker = new AdvancedMarkerElement({
            map,
            position: location.geocode,
            content: markerIcon,
            title: 'marker',
        });
        return marker;
    });
}
