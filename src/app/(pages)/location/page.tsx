import LocationMap from '@/app/_components/LocationMap';
import {MapProvider} from '@/app/_context/MapContext';

const Location = () => {
    return (
        <>
            <MapProvider>
                <LocationMap />
            </MapProvider>
        </>
    );
};
export default Location;
