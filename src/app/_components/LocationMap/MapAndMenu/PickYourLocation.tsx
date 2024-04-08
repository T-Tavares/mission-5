import {useMapContext} from '@/app/_context/MapContext';

export default function PickYourLocation() {
    const {getUserGeolocation} = useMapContext();

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200/70 gap-6">
            <h2 className="font-medium text-lg">First things first. We need a starting location.</h2>
            <button onClick={getUserGeolocation} className="w-4/5 px-4 py-2 text-white bg-primary rounded-full">
                Use current location
            </button>
            <input
                placeholder="Search a location"
                className="w-4/5 p-1 border-2 border-primary rounded-full pl-5 placeholder-[#7e3b98] placeholder:font-medium focus:outline-none"
            ></input>
        </div>
    );
}
