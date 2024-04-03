'use client';

import getUserGeocode from './getUserGeocode';

export default async function initializeUserMarker(map: any, userGeolocation: any) {
    // REQUEST LIBRARIES
    const {AdvancedMarkerElement} = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

    // GET USER GEOLOCATION IF NOT PROVIDED
    if (!userGeolocation) userGeolocation = await getUserGeocode();

    /* 
        Google operates on misterious ways... 
        
        Although I've done this conversion on the getUserGeocode function,
        I was getting an error of InvalidValue. The error did not crashed the page, because it was being resolved
        after the async did it's magic. But a red console log gives my OCD a bad time, so I've decided to recall it.
    */

    const usrLat = parseFloat(userGeolocation.lat.toFixed(6));
    const usrLng = parseFloat(userGeolocation.lng.toFixed(6));

    // CREATE HTML PIN ELEMENT
    const markerDiv = document.createElement('div');
    markerDiv.innerHTML = `
                    <div class="flex flex-col justify-center items-center">
                        <img src="/user-marker-black.png" class="h-12 w-12" /> 
                    </div> 
                    `;

    // RETURNS THE MARKER
    const marker = new AdvancedMarkerElement({
        map,
        position: {lat: usrLat, lng: usrLng},
        content: markerDiv,
        title: 'marker',
    });
}
