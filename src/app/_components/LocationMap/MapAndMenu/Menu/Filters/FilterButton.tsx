import {ReactElement} from 'react';
import {useDatabase} from '@/app/_context/DatabaseContext';

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

type T_FilterButton = {
    name: T_Services;
    label: string;
    icon?: ReactElement;
    filterType?: string;
    callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function FilterButton({name, label, icon, callback}: T_FilterButton) {
    const {filters} = useDatabase();
    console.log(icon);

    // CHECKS FOR ACTIVE FILTERS AND EMPTY FILTER ARRAY
    let isActive: boolean | undefined;
    if (filters?.length === 0) isActive = true;
    else isActive = filters?.includes(name);

    // ACTIVE FILTER BUTTON CLASS
    const activeBtnClass = 'text-primary  border-gray-200';

    return (
        <div className="flex flex-col w-[14rem] mx-auto gap-3 ">
            <div className="flex ">
                <button
                    onClick={callback}
                    name={name}
                    className={`relative px-8 py-2 w-full whitespace-nowrap font-medium rounded-full border-2 transition-all active:scale-95 ${
                        isActive ? activeBtnClass : 'bg-gray-200'
                    }`}
                >
                    <div className="absolute text-[1.4rem] top-2 left-5">{icon}</div>
                    {label}
                </button>
            </div>
        </div>
    );
}
