import {services, stationsTypes} from '@/app/_lib/data';

import {useMap} from '@/app/_context/MapContext';
import {useDatabase} from '@/app/_context/DatabaseContext';
import {useLocation} from '@/app/_context/LocationContext';

import FilterButton from './Filters/FilterButton';
import TypeFilterButton from './Filters/TypeFilterButton';

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

type T_Types = 'service_station' | 'truck_stop';

export default function Filters() {
    const {locationsDB, addRemoveFilters, clearFilters} = useDatabase();
    const isLocatonsDBUp = locationsDB?.length > 0 ? true : false;

    // ---------------- TYPE FILTER BUTTONS COMPONENT ----------------- //

    const TypesFiltersButtons = () =>
        stationsTypes.map(type => (
            <TypeFilterButton
                key={type._id}
                name={type._id as T_Types}
                label={type.name}
                icon={type.icon}
                callback={(e: React.MouseEvent) => typesFiltersCallback(e)}
            />
        ));

    // --------------- SERVICE FILTER BUTTONS COMPONENT --------------- //

    const ServicesFiltersButtons = () =>
        services.map(service => (
            <FilterButton
                key={service._id}
                name={service._id as T_Services}
                label={service.name}
                icon={service.icon}
                callback={(e: React.MouseEvent) => servicesFiltersCallback(e)}
            />
        ));

    // ---------------------------------------------------------------- //
    // ---------------------- CALLBACKS HANDLERS ---------------------- //
    // ---------------------------------------------------------------- //

    // ----------------- TYPES FILTER BUTTONS HANDLER ----------------- //

    const typesFiltersCallback = (e: Event) => {};

    // ---------------- SERVICE FILTER BUTTONS HANDLER ---------------- //

    const servicesFiltersCallback = (e: Event) => {
        const serviceClicked = e.target?.closest('button').name;
        if (serviceClicked) addRemoveFilters(serviceClicked);
    };

    return (
        <>
            {isLocatonsDBUp && (
                <div className="flex flex-col">
                    <div className="flex gap-10 py-7 justify-center">
                        <h3 className="font-medium text-base ">Station Type</h3>
                        <button onClick={clearFilters} className="font-medium text-base text-primary ">
                            Clear Filters
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 w-[14rem] mx-auto">
                        <TypesFiltersButtons />
                    </div>
                    <div className="flex py-7 justify-center">
                        <h3 className="font-medium text-base ">Services</h3>
                    </div>
                    <div className="flex flex-col gap-4 w-[14rem] mx-auto">
                        <ServicesFiltersButtons />
                    </div>
                </div>
            )}
            {!isLocatonsDBUp && <p className="m-10 text-center">Filters will be loaded once a location is provided.</p>}
        </>
    );
}
