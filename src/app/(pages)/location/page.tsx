import LocationMap from '@/app/_components/LocationMap';
import {LocationProvider} from '@/app/_context/LocationContext';
import {DatabaseProvider} from '@/app/_context/DatabaseContext';
import {MapProvider} from '@/app/_context/MapContext';

const Location = () => {
    return (
        <>
            <LocationProvider>
                <MapProvider>
                    <DatabaseProvider>
                        <MapProvider>
                            <LocationMap />
                        </MapProvider>
                    </DatabaseProvider>
                </MapProvider>
            </LocationProvider>
        </>
    );
};
export default Location;
