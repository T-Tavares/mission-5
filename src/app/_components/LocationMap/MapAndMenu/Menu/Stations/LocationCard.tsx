import {RiTruckFill, RiChargingPileFill} from 'react-icons/ri';
import {BsFuelPumpFill} from 'react-icons/bs';
import {MdGasMeter, MdLocalAtm, MdMyLocation} from 'react-icons/md';
import {FaTrailer, FaOilCan, FaUtensils} from 'react-icons/fa';
import {BiSolidCarWash, BiMaleFemale} from 'react-icons/bi';
import {GiCarWheel} from 'react-icons/gi';

export default function LocationCard({location}: any) {
    const openingHours = () => {
        // 24/7 Rule => If the opening hours are the same, then the location is open 24/7
        if (location.openingHours.from === location.openingHours.to) return 'Open 24/7';
        if (location.openingHours.from === 0 && location.openingHours.to === 24) return 'Open 24/7';

        // AM PM flags
        const formatTime = (time: number) => {
            if (time === 0) return '12 AM';
            if (time === 12) return '12 PM';
            if (time < 12) return `${time} AM`;
            if (time > 12) return `${time - 12} PM`;
        };

        return `From: ${formatTime(location.openingHours.from)} - To: ${formatTime(location.openingHours.to)}`;
    };

    const services = () => {
        return (
            <div className="flex mt-5 text-3xl gap-3 flex-wrap">
                {location.services.trailer_hire && <FaTrailer />}
                {location.services.car_wash && <BiSolidCarWash />}
                {location.services.tire_pressure && <GiCarWheel />}
                {location.services.food_and_drink && <FaUtensils />}
                {location.services.toilets && <BiMaleFemale />}
                {location.services.atm && <MdLocalAtm />}
                {location.services.ev_charging && <RiChargingPileFill />}
                {location.services.lpg_bottle_swap && <MdGasMeter />}
            </div>
        );
    };

    return (
        <div className="p-3 my-3 border-2 rounded-xl border-grey-400 w-3/4">
            <h3 className="font-bold text-lg ">{location.name}</h3>
            <p className="text-lg">{location.address}</p>
            <p className="text-lg">{location.duration.text}</p>
            <p className="text-lg">{location.distance.text}</p>
            <p className="text-lg">{openingHours()}</p>
            {services()}
        </div>
    );
}
