'use client';
import {MdStar} from 'react-icons/md';

export default async function initializeMarkers(map: any, locationsList: any[]) {
    // REQUEST LIBRARIES
    const {AdvancedMarkerElement} = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

    return locationsList.map(location => {
        const lowPriceStar = location.price < 6 ? '<p class="text-3xl text-green-500">⭑</p>' : '';

        const markerDiv = document.createElement('div');
        markerDiv.innerHTML = `
        <div class="relative">
            <div class="flex flex-col justify-center items-center relative top-20">
                <img src="/marker.png" class="h-12 w-12" /> 
                <div class="flex justify-center items-center leading-0 py-1 px-4 pl-2 mt-2 border-2 border-purple-800 rounded-lg bg-white text-base leading-5  text-purple-800 text-center">
                    ${lowPriceStar}
                    <div class="ml-2">
                        <p class="leading-0">$${location.price}</p>
                        <p class="leading-0 text-sm">per litre</p>
                    </div>
                </div> 
            </div> 
        </div>
        `;

        const markerIcon = document.createElement('img');
        markerIcon.src = '/marker.png';

        const marker = new AdvancedMarkerElement({
            map,
            position: location.geocode,
            content: markerDiv,
            title: 'marker',
        });
        return marker;
    });
}
