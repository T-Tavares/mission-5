export default async function getUserGeocode() {
    return new Promise((resolve, reject) => {
        // IF DEVICE DOES NOT SUPPORT GEOLOCATION / OR USER DID NOT ALLOWED IT... BYE BYE
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // RETURNS USER LOCATION
                    resolve({
                        lat: parseFloat(position.coords.latitude.toFixed(6)),
                        lng: parseFloat(position.coords.longitude.toFixed(6)),
                    });
                },
                error => reject(console.error('Error getting user geolocation', error))
            );
        } else reject(console.error('Geolocation is not supported by this browser.'));
    });
}
