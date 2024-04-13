import {services} from '@/app/_lib/data';
import {BsFuelPumpFill} from 'react-icons/bs';
import {RiTruckFill} from 'react-icons/ri';

import {useMap} from '@/app/_context/MapContext';

export default function Filters() {
    const {filters} = useMap();

    // TODO REWORK THIS WHOLE SECTION
    // ! REWORK THIS WHOLE SECTION

    //* --- REWORK PLAN FOR THIS SECTION
    //* --- REWORK PLAN FOR THIS SECTION
    //* --- REWORK PLAN FOR THIS SECTION

    // --- BREAK COMPONENTS INTO SMALLER COMPONENTS
    // --- WORK ON BUTTON FILTER CLICKS
    // --- CREATE ACTIVE CLASS FOR FILTER BUTTONS
    // --- ADD LOGIC TO CLICKS
    // -------- IF FILTERS IS EMPTY => REMOVE ALL ACTIVE CLASSES //  ADD FILTER TO FILTERS // ADD ACTIVE CLASS TO SPECIFIC FILTER
    // -------------- (LATER) => THIS SOULD TRIGGER THE MARKERS FILTERS FUNCTION AND HIDE THE MARKERS
    // -------- ELSE ADD FILTER TO FILTERS // ADD ACTIVE CLASS TO SPECIFIC FILTERS
    // -------- IF ALL FILTER WHERE ADDED TO LIST => REMOVE ALL FILTER FROM ARRAY AND ADD ACTIVE CLASS TO ALL FILTER BUTTONS (RESET FILTERS)

    const servicesFilters = () => {
        // IF FILTERS IS EMPTY => RETURN ALL SERVICES BUTTONS AS ACTIVE
        // IF FILTERS HAS VALUES => RETURN ACTIVE BUTTONS ACCORDING TO FILTERS

        return services.map((service, index) => {
            const buttonName = `${service.name.toLowerCase().replaceAll(' ', '-')}`;
            return (
                <div key={index} className="">
                    <button
                        name={buttonName}
                        // onClick={filtersHandler}
                        className="relative px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-gray-200 transition-all active:scale-95"
                    >
                        <div className={`absolute text-2xl pr-4 left-4`}>{service.icon}</div>
                        <div className={`text-lg`}>{service.name}</div>
                    </button>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col ">
            <div className="flex justify-center py-4">
                <div className="flex w-full justify-center py-4 font-medium">
                    <h3>Station type</h3>
                </div>
                <div className="flex w-full justify-center py-4 font-medium text-primary">
                    <h3>Clear filter</h3>
                </div>
            </div>

            <div className="flex flex-col w-[14rem] mx-auto gap-3 ">
                <div className="flex ">
                    <button className="relative px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-gray-200 transition-all active:scale-95">
                        <RiTruckFill className="absolute text-[1.4rem] top-2 left-5" />
                        Truck Stop
                    </button>
                </div>

                <div className="flex ">
                    <button className="relative px-8 py-2 w-full whitespace-nowrap text-primary font-medium rounded-full border-2 border-gray-200 transition-all active:scale-95">
                        <BsFuelPumpFill className="absolute text-[1.3rem] top-2 left-5" />
                        Service Station
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex py-10 pl-10">
                    <h3 className="font-medium text-base">Services</h3>
                </div>
                <div className="flex flex-col gap-4 w-[14rem] mx-auto">{servicesFilters()}</div>
            </div>
        </div>
    );
}
