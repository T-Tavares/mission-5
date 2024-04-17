import {ReactElement} from 'react';
import {useDatabase} from '@/app/_context/DatabaseContext';

type T_Types = 'service_station' | 'truck_stop';

type T_FilterButton = {
    name: T_Types;
    label: string;
    icon?: ReactElement;
    filterType?: string;
    callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function TypeFilterButton({name, label, icon, callback}: T_FilterButton) {
    // TODO CHECKS FOR ACTIVE FILTERS AND EMPTY FILTER ARRAY
    let isActive: boolean | undefined = true;

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
