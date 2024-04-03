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
                {location.services.trailerHire && <FaTrailer />}
                {location.services.carWash && <BiSolidCarWash />}
                {location.services.tirePressure && <GiCarWheel />}
                {location.services.foodnDrink && <FaUtensils />}
                {location.services.toilet && <BiMaleFemale />}
                {location.services.ATM && <MdLocalAtm />}
                {location.services.EVcharging && <RiChargingPileFill />}
                {location.services.LPGbottleSwap && <MdGasMeter />}
            </div>
        );
    };

    return (
        <div className="p-3 my-3 border-2 rounded-xl border-grey-400 w-3/4">
            <h3 className="font-bold text-lg ">{location.name}</h3>
            <p className="text-lg">{location.address}</p>
            <p className="text-lg">distance</p>
            <p className="text-lg">{openingHours()}</p>
            {services()}
        </div>
    );
}
