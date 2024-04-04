// REFERENCE LINKS
// https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions

export const dynamic = 'force-dynamic';

export async function getPathAtoB(map: any, userGeolocation: any, destinationGeocode?: any) {
    const directionRenderOptions = {
        draggable: true,
        infoWindow: new google.maps.InfoWindow(),
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: '#00C87A',
            strokeWeight: 8,
        },
        preserveViewport: true,
    };

    const directionsRenderer = new google.maps.DirectionsRenderer(directionRenderOptions);
    const directionsService = new google.maps.DirectionsService();

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer, userGeolocation, destinationGeocode);
}

async function calculateAndDisplayRoute(
    directionsService: any,
    directionsRenderer: any,
    userGeolocation: any,
    destinationGeocode: any
) {
    const usrLat = userGeolocation.lat;
    const usrLng = userGeolocation.lng;

    // TESTING LOCATIONS MANUALLY
    if (!destinationGeocode) destinationGeocode = {lat: -36.848512, lng: 174.746123};

    directionsService
        .route({
            origin: {lat: usrLat, lng: usrLng},
            destination: destinationGeocode,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response: any) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e: Error) => console.error('Directions request failed due to ' + e));
}

export default async function getCloserPaths(map: any, userGeolocation: any, locationsDB: any[]) {
    // const reasonableDistanceLocations = locationsDB.filter((location: any) => location.distance.value < 15000);
    const reasonableDistanceLocations = locationsDB.filter((location: any) => location.distance.value < 7000);

    reasonableDistanceLocations.forEach((location: any) => {
        getPathAtoB(map, userGeolocation, location.geocode);
    });
}
