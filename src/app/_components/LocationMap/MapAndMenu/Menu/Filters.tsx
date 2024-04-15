import {services, stationsTypes} from '@/app/_lib/data';

import {useMap} from '@/app/_context/MapContext';
import {useDatabase} from '@/app/_context/DatabaseContext';
import {useLocation} from '@/app/_context/LocationContext';

import FilterButton from './Filters/FilterButton';

type T_Services =
    | 'atm'
    | 'car_wash'
    | 'engine_oils'
    | 'ev_charging'
    | 'food_and_drink'
    | 'lpg_bottle_swap'
    | 'toilets'
    | 'trailer_hire'
    | 'tyre_pressure';

export default function Filters() {
    const {addRemoveFilters} = useMap();
    const {locationsDB} = useDatabase();
    const isLocatonsDBUp = locationsDB?.length > 0 ? true : false;

    const TypesFilters = () =>
        stationsTypes.map(type => (
            <FilterButton key={type._id} name={type._id as T_Services} label={type.name} icon={type.icon} />
        ));

    const servicesFiltersCallback = (e: Event) => {
        const serviceClicked = e.target?.closest('button').name;
        if (serviceClicked) addRemoveFilters(serviceClicked);
    };

    const ServicesFilters = () =>
        services.map(service => (
            <FilterButton
                key={service._id}
                name={service._id as T_Services}
                label={service.name}
                icon={service.icon}
                callback={(e: React.MouseEvent) => servicesFiltersCallback(e)}
            />
        ));

    return (
        <>
            {isLocatonsDBUp && (
                <div className="flex flex-col">
                    <div className="flex py-7 justify-center">
                        <h3 className="font-medium text-base ">Station Type</h3>
                    </div>
                    <div className="flex flex-col gap-4 w-[14rem] mx-auto">
                        <TypesFilters />
                    </div>
                    <div className="flex py-7 justify-center">
                        <h3 className="font-medium text-base ">Services</h3>
                    </div>
                    <div className="flex flex-col gap-4 w-[14rem] mx-auto">
                        <ServicesFilters />
                    </div>
                </div>
            )}
            {!isLocatonsDBUp && <p className="m-10 text-center">Filters will be loaded once a location is provided.</p>}
        </>
    );
}
