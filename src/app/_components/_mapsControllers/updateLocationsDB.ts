import {Loader} from '@googlemaps/js-api-loader';

// GET GEOCODE ARRAY FROM LOCATIONS DB
function getLocationsGeocodeMatrix(locationsDB: any) {
    const geoMatrix = locationsDB.map((location: any) => {
        return {
            lat: location.geocode.lat,
            lng: location.geocode.lng,
        };
    });
    return geoMatrix;
}

// GET DISTANCE MATRIX AND MERGE IT WITH LOCATIONS DB
export default async function updateLocationsDB(locationsDB: any, origin?: any) {
    // initialize distance matrix service
    const service = new google.maps.DistanceMatrixService();

    if (!origin) origin = {lat: -36.79898, lng: 174.7417}; // Default origin to my house // TODO TO BE REMOVED

    // PREPARING DESTINATIONS AND ORIGIN FOR REQUEST
    const destinationsArr = getLocationsGeocodeMatrix(locationsDB);
    const originsArr = destinationsArr.map(() => origin);

    // REQUEST OBJECT
    const request = {
        origins: originsArr,
        destinations: destinationsArr,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };

    // GOOGLE API REQUEST FOR MATRIX
    const response = await service.getDistanceMatrix(request);

    // UPDATE LOCATIONS DB WITH DISTANCE AND DURATION
    const updatedLocationsDB = locationsDB
        .map((location: any, index: number) => {
            //
            // TO KEEP THE INTEGRITY OF THE DB
            // IF GOOGLE CANT CALCULATE DISTANCE FOR SOME REASOM... RETURNS N/A

            if (response.rows[0].elements[index].status !== 'OK') {
                return;
                /* 
                    Kept this return here for reference
                    N/A and 0 values breaks the "from nearest" filter in the app
                    
                    Had to choose between that or wipe uncalculated locations 
                */
                return {
                    ...location,
                    distance: {
                        text: 'N/A',
                        value: 0,
                    },
                    duration: {
                        text: 'N/A',
                        value: 0,
                    },
                };
            }

            return {
                ...location,
                distance: response.rows[0].elements[index].distance,
                duration: response.rows[0].elements[index].duration,
            };
        })
        .filter((location: any) => location);

    return updatedLocationsDB;
}
