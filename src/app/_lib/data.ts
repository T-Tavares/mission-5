import React from 'react';

import {BiMaleFemale, BiSolidCarWash} from 'react-icons/bi';
import {FaOilCan, FaTrailer, FaUtensils} from 'react-icons/fa6';
import {GiCarWheel} from 'react-icons/gi';
import {MdGasMeter, MdLocalAtm} from 'react-icons/md';
import {RiChargingPileFill, RiTruckFill} from 'react-icons/ri';
import {BsFuelPumpFill} from 'react-icons/bs';

export const products = [
    {name: 'At the station', href: '#'},
    {name: 'Power your home with Z', href: '#'},
    {name: 'Z App', href: '#'},
    {name: 'Rewards and promotions', href: '#'},
] as const;

export const forBusiness = [
    {name: 'Z business fuel card', href: '#'},
    {name: 'Fuels and services', href: '#'},
    {name: 'Sign up for Z Business Plus', href: '#'},
    {name: 'Business tips and stories', href: '#'},
    {name: 'Apply', href: '#'},
    {name: 'Login', href: '#'},
] as const;

export const sustainability = [
    {name: 'Our sustainability goals', href: '#'},
    {name: 'Tackling carbon emissions', href: '#'},
    {name: 'Nature restoration', href: '#'},
    {name: 'Digital sustainability', href: '#'},
    {name: 'Supplier Code of Conduct', href: '#'},
    {name: 'Supporting electric vehicles', href: '#'},
] as const;

export const about = [
    {name: 'Our story', href: '#'},
    {name: 'What we stand for', href: '#'},
    {name: 'Our people', href: '#'},
    {name: 'We’re moving with the times', href: '#'},
    {name: 'Careers at Z', href: '#'},
    {name: 'Corporate centre', href: '#'},
] as const;

export const stationsTypes = [
    {
        _id: 'service_station',
        name: 'Service Station',
        icon: React.createElement(BsFuelPumpFill),
    },
    {
        _id: 'truck_stop',
        name: 'Truck Stop',
        icon: React.createElement(RiTruckFill),
    },
];

export const services = [
    {
        _id: 'atm',
        name: 'ATM',
        icon: React.createElement(MdLocalAtm),
    },
    {
        _id: 'car_wash',
        name: 'Car wash',
        icon: React.createElement(BiSolidCarWash),
    },
    {
        _id: 'engine_oils',
        name: 'Engine Oils',
        icon: React.createElement(FaOilCan),
    },
    {
        _id: 'ev_charging',
        name: 'EV Charging',
        icon: React.createElement(RiChargingPileFill),
    },
    {
        _id: 'food_and_drink',
        name: 'Food and drink',
        icon: React.createElement(FaUtensils),
    },
    {
        _id: 'lpg_bottle_swap',
        name: 'LPG bottle swap',
        icon: React.createElement(MdGasMeter),
    },
    {
        _id: 'toiets',
        name: 'Toilets',
        icon: React.createElement(BiMaleFemale),
    },
    {
        _id: 'trailer_hire',
        name: 'Trailer Hire',
        icon: React.createElement(FaTrailer),
    },
    {
        _id: 'tyre_pressure',
        name: 'Tyre Pressure',
        icon: React.createElement(GiCarWheel),
    },
] as const;
